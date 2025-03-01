import React, {
  useEffect,
  useRef,
  useState,
  useCallback
} from "react";

import "./Bubbles.css";
import Tables from "./Tables";


export default function Bubbles({showinfo, setShowinfo, nifty50Data, setNifty50Data, loading, error, favorites, showfav, setShowfav}) {

  let [timeline, setTimeline] = useState("1")





  if (loading) {
    return <div > Please wait, This may take upto a minute... </div>;
  }

  if (error) {
    return <div > Error: {error.message} </div>;
  }


  if (!nifty50Data) {
    return <div > No data available. </div>
  }


  return (
    <div >
      <div className = "tabs" >
        <button className = {`tabbtn ${timeline == "0" ? 'tabbtnslct' : ''}`} onClick={() => setTimeline("0")}> Hour </button>
        <button className = {`tabbtn ${timeline == "1" ? 'tabbtnslct' : ''}`} onClick={() => setTimeline("1")}> Day </button>
        <button className = {`tabbtn ${timeline == "2" ? 'tabbtnslct' : ''}`} onClick={() => setTimeline("2")}> Week </button>
        <button className = {`tabbtn ${timeline == "3" ? 'tabbtnslct' : ''}`} onClick={() => setTimeline("3")}> Month </button>
        <button className = {`tabbtn ${timeline == "4" ? 'tabbtnslct' : ''}`} onClick={() => setTimeline("4")}> Year </button>
        <button className = {`tabbtn ${timeline == "5" ? 'tabbtnslct' : ''}`} onClick={() => setTimeline("5")}> Market Cap </button>

      </div>

      <div className = "bubbles" >
        <BubbleCanvas data = {nifty50Data} timeline={timeline} showinfo = {showinfo} setShowinfo = {setShowinfo} favorites = {favorites} showfav ={showfav}/>
      </div>

      

    </div>

  );

}



const BubbleCanvas = ({data, timeline, showinfo, setShowinfo, favorites, showfav}) => {
  
  const canvasRef = useRef(null);
  const [balls, setBalls] = useState([]);
  const numBalls = data.length;
  let clickStartTime = useRef(0);
  const favBalls = favorites.length;









  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", {willReadFrequently: true});

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 120;



    class Ball {
      constructor(x, y, radius, dx, dy, color, text1, text2) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
        this.text1 = text1;
        this.text2 = text2;
        this.isDragging = false;
        this.hover = false;
      }



      draw() {
        let gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          this.radius * 0.5,
          this.x,
          this.y,
          this.radius
        );

        gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.9, this.color + "0.7)");
        gradient.addColorStop(1, this.color + "0.7)");

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();



        // Change border color when hovered
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.hover ? this.color + "1)" : "white";
        ctx.stroke();
        ctx.closePath();



        // Draw text inside ball
        ctx.fillStyle = "#2D336B";
        ctx.font = `${this.radius / 4.5}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text1, this.x, this.y - this.radius * 0.2);
        ctx.fillText(this.text2, this.x, this.y + this.radius * 0.2);

      }



      update() {
        if (!this.isDragging) {
          this.x += this.dx;
          this.y += this.dy;

          if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx *= -1;
            this.x = Math.max(this.radius, Math.min(this.x, canvas.width - this.radius)); // Correct x position
          }
          if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
              this.dy *= -1;
              this.y = Math.max(this.radius, Math.min(this.y, canvas.height - this.radius)); // Correct y position
          }
        }

        this.draw();

      }
    }



    const colors = ["rgba(250, 30, 0, ", "rgba(120, 134, 199, "];

    let newBalls = [];

    let t;
    let minRadius = window.innerHeight / 25;
    let maxRadius = window.innerHeight / 6; 
    let minValue;
    let maxValue;


    let values_hourly = data.map(item => { return Math.abs(item.hourly_change) })
    let values_daily = data.map(item => { return Math.abs(item.daily_change) })
    let values_weekly = data.map(item => { return Math.abs(item.weekly_change) })
    let values_monthly = data.map(item => { return Math.abs(item.monthly_change) })
    let values_yearly = data.map(item => { return Math.abs(item.yearly_change) })
    let values_market = data.map(item => { return Math.abs(item.market_cap) })
    

      if(showfav){
        for (let i = 0; i < favBalls; i++) {



          let comp = data.find(item => item.name === favorites[i])

          


          switch(timeline){
            case "0":

              minValue = Math.min(...values_hourly)
              maxValue = Math.max(...values_hourly)

              t= comp.hourly_change
              break;
            case "1":

              minValue = Math.min(...values_daily)
              maxValue = Math.max(...values_daily)

              t = comp.daily_change
              break;
            case "2":
              minValue = Math.min(...values_weekly)
              maxValue = Math.max(...values_weekly)

              t = comp.weekly_change
              break;
            case "3":
              minValue = Math.min(...values_monthly)
              maxValue = Math.max(...values_monthly)

              t = comp.monthly_change
              break; 
            case "4":
              minValue = Math.min(...values_yearly)
              maxValue = Math.max(...values_yearly)

              t = comp.yearly_change
              break;   
            case "5":
              minValue = Math.min(...values_market)
              maxValue = Math.max(...values_market)

              t = comp.market_cap
              break;
          }
    
          let radius = minRadius + ((Math.abs(t) - minValue) / (maxValue - minValue)) * (maxRadius - minRadius);
          let x = Math.random() * (canvas.width - radius * 3) + 1.7 * radius;
          let y = Math.random() * (canvas.height - radius * 3) + 1.7 * radius;
          let dx = (Math.random() - 0.5) * 0.2;
          let dy = (Math.random() - 0.5) * 0.2;
          let color = colors[(t > 0) ? 1 : 0];
          let text1 =  ((timeline == "5") ? Math.floor(t/10000000) +'Cr' :t+ '%');
          let text2 = comp.name;
          newBalls.push(new Ball(x, y, radius, dx, dy, color, text1, text2));
        }

      }
      else{

        for (let i = 0; i < numBalls; i++) {

          switch(timeline){
            case "0":
              minValue = Math.min(...values_hourly)
              maxValue = Math.max(...values_hourly)


              t= data[i].hourly_change
              break;
            case "1":
              minValue = Math.min(...values_daily)
              maxValue = Math.max(...values_daily)

              t = data[i].daily_change
              break;
            case "2":
              minValue = Math.min(...values_weekly)
              maxValue = Math.max(...values_weekly)

              t = data[i].weekly_change
              break;
            case "3":
              minValue = Math.min(...values_monthly)
              maxValue = Math.max(...values_monthly)

              t = data[i].monthly_change
              break; 
            case "4":
              minValue = Math.min(...values_yearly)
              maxValue = Math.max(...values_yearly)

              t = data[i].yearly_change
              break;   
            case "5":
              minValue = Math.min(...values_market)
              maxValue = Math.max(...values_market)

              t = data[i].market_cap
              break;
          }
    
          let radius = minRadius + ((Math.abs(t) - minValue) / (maxValue - minValue)) * (maxRadius - minRadius);
          let x = Math.random() * (canvas.width - radius * 3) + 1.7 * radius;
          let y = Math.random() * (canvas.height - radius * 3) + 1.7 * radius;
          let dx = (Math.random() - 0.5) * 0.2;
          let dy = (Math.random() - 0.5) * 0.2;
          let color = colors[(t > 0) ? 1 : 0];
          let text1 =  ((timeline == "5") ? Math.floor(t/10000000) +'Cr' :t+ '%');
          let text2 = data[i].name;
          newBalls.push(new Ball(x, y, radius, dx, dy, color, text1, text2));
        }

        
      }
      

    




    setBalls(newBalls);


    const detectCollisions = () => {
      for (let i = 0; i < newBalls.length; i++) {
        for (let j = i + 1; j < newBalls.length; j++) {
          let ball1 = newBalls[i];
          let ball2 = newBalls[j];
          let dx = ball2.x - ball1.x;
          let dy = ball2.y - ball1.y;
          let distanceSq = dx * dx + dy * dy;
          let minDist = ball1.radius + ball2.radius;
          let minDistSq = minDist * minDist;

          if (distanceSq <= minDistSq) {
            let distance = Math.sqrt(distanceSq);
            let overlap = (minDist - distance) / 2;

            let nx = dx / distance;
            let ny = dy / distance;


            [ball1.dx, ball2.dx] = [ball2.dx, ball1.dx];
            [ball1.dy, ball2.dy] = [ball2.dy, ball1.dy];

            ball1.x -= nx * overlap;
            ball1.y -= ny * overlap;
            ball2.x += nx * overlap;
            ball2.y += ny * overlap;
          }

        }

      }

    };



    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let ball of newBalls) {
        ball.update();
      }


      detectCollisions();
      requestAnimationFrame(update);
    };


    update();


    let selectedBall = null;

    const handleMouseDown = (event) => {

      const rect = canvas.getBoundingClientRect(); // Get canvas position
      const mouseX = event.clientX - rect.left; // Adjust for canvas offset
      const mouseY = event.clientY - rect.top;
      


      for (let ball of newBalls) {
        let dist = Math.sqrt((mouseX - ball.x) ** 2 + (mouseY - ball.y) ** 2);
        if (dist <= ball.radius) {
          ball.isDragging = true;
          selectedBall = ball;
          clickStartTime.current = Date.now();
          break;
        }
      }


      if (selectedBall && selectedBall.isDragging) {
        const rect = canvas.getBoundingClientRect();
        let newX = event.clientX - rect.left;
        let newY = event.clientY - rect.top;

        // Boundary checks during dragging (crucial):
        newX = Math.max(selectedBall.radius, Math.min(newX, canvas.width - selectedBall.radius));
        newY = Math.max(selectedBall.radius, Math.min(newY, canvas.height - selectedBall.radius));


        selectedBall.x = newX;
        selectedBall.y = newY;
      }
    };



    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect(); // Get canvas position
      const mouseX = event.clientX - rect.left; // Adjust for canvas offset
      const mouseY = event.clientY - rect.top;
      let hovering = false;



      for (let ball of newBalls) {
        let dist = Math.sqrt((mouseX - ball.x) ** 2 + (mouseY - ball.y) ** 2);
        ball.hover = dist <= ball.radius;
        if (ball.hover) hovering = true;
        if (selectedBall && selectedBall.isDragging) {
          selectedBall.x = mouseX;
          selectedBall.y = mouseY;
        }

      }



      // Change cursor when hovering over a ball
      canvas.style.cursor = hovering ? "pointer" : "default";
    };



    const handleMouseUp = () => {

      if (selectedBall) {
        let clickDuration = Date.now() - clickStartTime.current;

        if (clickDuration < 200) { // If released quickly, it's a single click
          let comp = selectedBall.text2
          setShowinfo((prevState) => ({
            state: !prevState.state,
            company: (prevState.state) ? '' : comp, // Set the company name
          }));
        }
        selectedBall.isDragging = false;
        selectedBall = null;
        
      }
    };



    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);


    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };

  }, [timeline, data, showfav, favorites]);



  return <canvas ref = {canvasRef}/>;

};