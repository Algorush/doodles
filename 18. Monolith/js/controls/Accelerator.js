function Accelerator(speed, accelerationMax, accelerationIncreaseStep, accelerationDecreaseStep) {
    
    let acceleration = 0
    let prevDirection = 0

    this.getForce = function(direction) {
        updateAngleAcceleration(direction)
        prevDirection = direction

        return speed * acceleration
    }

    this.boost = function(factor) {        
        acceleration *= factor
    }

    function updateAngleAcceleration(direction) {
        const absAcc = Math.abs(acceleration)

        if(direction === 0)
            decelerate()            
        else        
            accelerate(direction)
        
        function decelerate() {
            if(absAcc !== 0)
                acceleration = Math.sign(acceleration) * ( absAcc - accelerationDecreaseStep )
                // acceleration = Math.sign(acceleration) * ( absAcc - Math.sin(absAcc)/40 )
            if(absAcc < 0.01)
                acceleration = 0

            return 0
        }

        function accelerate(direction) {            
            if( prevDirection != direction )
                decelerate()

            if(absAcc < accelerationMax)
                acceleration += direction * accelerationIncreaseStep
            else
                decelerate()

            return direction
        }
    }
}