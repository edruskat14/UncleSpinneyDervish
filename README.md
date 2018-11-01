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

The bubble elimination process uses various breadth first searching algorithms depending on the situation. If the impact bubble connects to two or more of the same color, those bubbles will be popped. Any bubbles who have lost their direct connection to the center will also be popped.
```
eliminateEntireTree(bubble) {
  const choppingBlock = [bubble];
  const queue = bubble.touching.slice();
  while (queue.length > 0) {
    queue[0].touching.forEach((item) => {
      if (queue.indexOf(item) === -1 && choppingBlock.indexOf(item) === -1) {
        queue.push(item);
      }
    })
    choppingBlock.push(queue[0]);
    queue.shift();
  }
  choppingBlock.forEach((sacrifice) => {
    this.destroyBubble(sacrifice);
    this.points += 1 * this.multiplier;
  })
}
```
This algorithm eliminates all bubbles connected to a certain bubble. It is used in a case where a bubble is found to have no direct connection to the center. It is careful to not make an attempt to remove the same bubble more than one time.
