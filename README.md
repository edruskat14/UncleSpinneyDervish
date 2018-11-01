# UncleSpinneyDervish

Background:
  This will be an attempt to create a game similar to bubble spinner. There is a circle of bubbles in the center of the screen    and the player has one bubble in hand to shoot at the circle. If three of the same color bubble come in contact the three     or more of them will disappear. The goal each round is to eliminate all bubbles. If does not eliminate any bubbles for a certain number of turns then some more will be added to the circle. If a bubble touches the outer edge the player loses.

  MVPs
    - Bubbles with traits such as hit boxes and colors.
    - The main circle made up of a certain number of bubbles.
    - The starting position and ability for a player to shoot a bubble from there.
    - The elimination and addition of bubbles
    - points per bubble

  Bonus
    - The circle spins when hit (the speed and direction depend on the hit)
    - the bubbles can bounce off walls
    - High scores
    - Cool music

  Wireframe:
    The main idea is to look something like this picture: http://i1-games.softpedia-static.com/screenshots/Bubble-Spinner-2_3.jpg, however if I can be creative perhaps I can alter it a bit.

  Technologies:
    I don't expect to need any libraries beyond vanilla JS. THe difficulty will be in creating the physics of the game and the     proper hitboxes of the bubbles.

  Backend:
    Adding a backend would be nice for high scores. This would just require a high scores table involving a name input by the     user and a score.

  Timeline:
    A bubble: the first thing will be to design a bubble itself. This will require various colors, the shape will be round and      the interaction between bubbles will be sticking together on contact.  
    The Board: the second phase will be creating a board which will be a circle of bubble in the center of the screen with          walls around it. The board will shrink and grow as bubbles are eliminated and added.  
    Actions: The final of the main MVPs will be to create the user's shooting action, the bubble popping action, and the            bubble adding action. The popping will involve gaining points and possibly ending a round. The adding action may lead to      a game over if a bubble touches the side.
