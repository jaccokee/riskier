/*

Game Mechanics for Riskier

Based on Traditional Risk:
- 3+ players; init game asking how many players, assign colors
- Set-up: randomly pick player turn order
-         players take turns choosing starting location on map
-         all other territories are neutral / computer controlled
- turn based; track who's turn
- territories are all identified with color for each player or non-player/computer, and defensive strength #, and randomly generated name
- turn step 1: player gets armies based on territory holdings
-              min 3 armies, or floor(territories/3) armies
-              any territory held for 5+ turns gains defensive strength by 1, and every 2 turns thereafter
-      step 2: player may choose to play cards gaining additional armies (REMOVE)
-      step 3: player fortifies territories with armies (rules about bonus armies)
-              army fortification adds to defensive strength of territory (NOT attack)
-              player chooses armies to use for offensive attack; any number of neighboring territories, or one attack only on any remote territory
-              player may keep armies in a bank and not use them on this turn
-      step 4: loop through attacks - player may choose to attack a neighboring territory
-              if another player has lost last territory, they are no longer in the game
-              if no more opponents are left, player wins
-      step 5: player makes defensive move
- player turn changes hands
 */