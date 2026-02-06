import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Nat32 "mo:core/Nat32";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Order "mo:core/Order";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Authorization state & mixin
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profile type & map
  public type UserProfile = {
    name : Text;
    // Other user metadata if needed
  };
  let userProfiles = Map.empty<Principal, UserProfile>();

  // High Score Data Structure
  public type HighScore = {
    gameId : Text;
    user : Principal;
    score : Nat32;
  };

  module HighScore {
    public func compare(left : HighScore, right : HighScore) : Order.Order {
      switch (Nat32.compare(left.score, right.score)) {
        case (#equal) { Principal.compare(left.user, right.user) };
        case (result) { result };
      };
    };
  };

  // High Scores Database Structure: Map of gameId to list of high scores
  let gameHighScores = Map.empty<Text, [HighScore]>();

  // User Profile Methods
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // High Score/Leaderboard API
  // Add new score for a game
  public shared ({ caller }) func submitScore(gameId : Text, score : Nat32) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit scores");
    };

    let highScore : HighScore = {
      gameId;
      user = caller;
      score;
    };

    let existingScores = switch (gameHighScores.get(gameId)) {
      case (null) { [] };
      case (?scores) { scores };
    };

    let updatedScores = existingScores.concat([highScore]);
    gameHighScores.add(gameId, updatedScores);
  };

  // Get top scores for a game (public leaderboard - accessible to all including guests)
  public query ({ caller }) func getTopScores(gameId : Text) : async [HighScore] {
    switch (gameHighScores.get(gameId)) {
      case (null) { [] };
      case (?scores) {
        scores.sort().reverse();
      };
    };
  };

  // Get user's best score for a game (requires authentication)
  public query ({ caller }) func getUserBestScore(gameId : Text) : async ?HighScore {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view their best score");
    };

    let userScores = switch (gameHighScores.get(gameId)) {
      case (null) { [] };
      case (?scores) {
        scores.filter(
          func(score) {
            score.user == caller;
          }
        );
      };
    };

    var bestScore : ?HighScore = null;
    for (score in userScores.values()) {
      switch (bestScore) {
        case (null) { bestScore := ?score };
        case (?currentBest) {
          if (score.score > currentBest.score) {
            bestScore := ?score;
          };
        };
      };
    };
    bestScore;
  };
};
