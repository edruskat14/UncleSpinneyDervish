# UncleSpinneyDervish

[Play the game](http://edruskat14.live/UncleSpinneyDervish/)

## Background  
  This is a browser game based on bubble spinner. There is a blob of bubbles in the center of the screen and the player has one bubble in hand to shoot at the circle. If the player connects three or more of the same color bubble, those bubbles will pop. The goal each round is to eliminate all bubbles. If a bubble in the blob touches the outer edge the player loses.  

  The Game is build using JavaScript along with Canvas.

## Features
  When struck by the player's bubble the main bubble blob will spin based on the angle of incidence. This is programmed using algebra and trigonometry.  
  ```   
       findImpactAngle() {
       const slopeA = (this.impactBubble.y - this.initialPos.y)/(this.impactBubble.x - this.initialPos.x);
       const slopeB = (this.impactBubble.y/this.impactBubble.x)
       const tanAng = ((slopeB - slopeA) /(1 + slopeB*slopeA));
       if (!tanAng) {
         return 0;
       } else if (this.movingAway()) {
         return -Math.atan(tanAng);
       } else {
         return Math.atan(tanAng);
       }
     }
```  
This helps determine the initial speed and direction in which the bubble blob spins based on the impact angle of the bubble shot by the player.


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
