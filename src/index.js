import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';



//Componente controlado, pois o board terá controle total sobre eles
//Basicamente só recebem valores da board e informam quando são clicados
//Portanto é um componente funcional

  
  class Timer extends React.Component {
    constructor(props){
      super(props);
      this.state={
        input:'',
        secondsElapsed:0,
        time:{'h':0,'m':0,'s':0},
        isStart:true,
        btnText:'Start tracking',
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
    };
    handleChange(e) {
      this.setState({ input: e.target.value });
    };
    handleClick(e){
      //console.log(this.state.input);
      if(this.state.isStart){
      this.state.btnText='Stop tracking'
      this.tick();
      }
      else{
        this.state.btnText='Start tracking';
        this.props.onTimerClick(this.state.input,this.state.time);
        this.state.secondsElapsed=0;
        this.state.time={'h':0,'m':0,'s':0};
        clearInterval(this.interval);
      }
      this.setState(prevState=>({
        isStart:!prevState.isStart
      }))
      //this.props.onTimerClick(this.state.input)
    }
    //Atualiza o status seconds no intervalo estabelecido
    tick(){
      this.interval = setInterval(()=>{
        this.setState(
          prevState=>(
            {
              secondsElapsed:prevState.secondsElapsed +1
            }
          )
        )
        var timeElapsed = this.secondsForTime(this.state.secondsElapsed);
        this.state.time=timeElapsed;
        console.log(this.state.time);
      },1000)
    }
    secondsForTime(secs){
      let hours = Math.floor(secs/(60*60));

      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);

      let timeObj = {
        "h":hours,
        "m":minutes,
        "s":seconds,
      };
      return timeObj
    }
    componentWillUnmount(){
      clearInterval(this.interval);
    }
    render(){
      return (
        <div className="row mt-3 mx-auto w-100">
          <div className="col-7">
      <input type="email" className="form-control form-control-sm" id="colFormLabelSm" placeholder="Insert a description of what you are tracking" onChange={this.handleChange}></input>
            </div>
            <div className="col-3">
              <p>Time elapsed: {this.state.time.h} h {this.state.time.m} m {this.state.time.s} s</p>
            </div>
            <div className="col-2">
            <button type="submit" className="btn btn-primary "  onClick={this.handleClick}>{this.state.btnText}</button>

            </div>
        </div>
      );
    }
  }
  
  class Times extends React.Component {

    constructor(props){
          super(props);
          this.state={
              timeHistory:[],
          }
          this.getTimerData = this.getTimerData.bind(this);
      }
      getTimerData(text,time){
        console.log(text);
        console.log(time);
        let timeObj = {
          'Title':text,
          'TimeElapsed':time,
        }
        this.setState(prevState=>({
          timeHistory:prevState.timeHistory.concat(timeObj),
      }));
console.log(this.state.timeHistory);
      }
    render() {
      const historyLog=this.state.timeHistory;
      console.log(historyLog);
      const history= historyLog.map((value,index)=>{
        return(<li key={index} className="list-group-item">
            <h4>{value.Title} <small>| Time elapsed: 
               { value.TimeElapsed.h} h {value.TimeElapsed.m} m {value.TimeElapsed.s} s</small></h4>
        </li>)
              
      })
      return (
        <div className="timeTracking">
        <div className="timer">
        <Timer
        onTimerClick = {this.getTimerData}
        />
        </div>
        <div className="timeLog">
          <ul className='list-group'>
          {history}
          </ul>
        </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Times />,
    document.getElementById('root')
  );
  


 
  