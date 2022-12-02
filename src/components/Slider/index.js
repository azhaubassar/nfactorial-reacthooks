import React, { useEffect, useState } from "react";

class Slider extends React.Component {
    state = {
        activeSlide: 0,
        autoplay: false, 
    }

    changeSlide = (i) => {
        this.setState(({activeSlide})=>({
            activeSlide: activeSlide + i <= 4 && activeSlide + i >= 0 ? activeSlide + i : 0,
        }))
        // this.setState({
        //     activeSlide: this.state.activeSlide + i <= 4 && this.state.activeSlide + i >= 0 ? this.state.activeSlide + i : 0,
        // })
    }

    componentDidMount(){
        document.title = "Lecture 15!!!"
    }

    toggleAutoplay = () => {
        this.setState({
            autoplay: !this.state.autoplay //true
        })
    }

    componentDidUpdate(prevProps, prevState){

        if(prevProps!==this.props){
            // code
        }

        if(prevState.autoplay!==this.state.autoplay){
            if(this.state.autoplay){
                this.intervalId = setInterval(()=>{
                    this.changeSlide(1)
                }, 5000)
            }else{
                clearInterval(this.intervalId)
            }
        }
    }

    componentWillUnmount(){
        clearInterval(this.intervalId)
    }

    render(){
        const { activeSlide,autoplay } = this.state;
        console.log(activeSlide)

        return (
            <div className="slider w-50 m-auto mt-5">
                <img className="d-block w-100" src={require(`./images/${activeSlide}.jpeg`)} alt="slider item"/>
                <div className="text-center mt-5">Active slide {activeSlide}</div>
                {autoplay && <div className="text-center mt-5">Autoplay</div>}
            
            <div className="d-flex mt-5 justify-content-between">
                <button className="btn btn-primary" onClick={()=>this.changeSlide(-1)}>prev slide</button>
                <button className="btn btn-primary" onClick={()=>this.toggleAutoplay()}>autoplay</button>
                <button className="btn btn-primary" onClick={()=>this.changeSlide(1)}>next slide</button>
            </div>
            </div>
        )
    }
}

function SliderFunctionalComponent(props){
    const [activeSlide, setActiveSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);
    const [state, setState] = useState({activeSlide: 0, autoplay:false});
    const [componentMounted, setComponentMounted] = useState(false);

    useEffect(()=>{ //componentDidMount
        console.log('effect')
        document.title = "Slider!"
        setComponentMounted(true);
    }, [componentMounted])

    useEffect(()=>{ //componentDidUpdate - prevState
        let intervalId;
        if(autoplay){
            intervalId = setInterval(()=>{
                changeSlide(1)
            }, 5000) 
        }else{
            clearInterval(intervalId)
        }
        
        return () => { // componentWillUnmount
            clearInterval(intervalId)
            document.title = 'Lecture 15'
        };
    }, [autoplay]) //changing state

    useEffect(()=>{ // componentDidUpdate - prevProps
        console.log('PRops changed!!!')
    }, [props]) // changing props


    // activeSlide = 0
    function changeSlide(i) {
        // setState((state)=> ({ 
        //     ...state,  // возьми все что есть в state => {activeSlide: 0, autoplay:false}
        //     activeSlide: state.activeSlide + i // перезапиши/измени activeSlide => {activeSlide: 1, autoplay:false}
        // })) 
        setActiveSlide((activeSlide)=> activeSlide + i )
    }

    // autoplay - false/true
    function toggleAutoplay(){
        setAutoplay(!autoplay) 
    }

    return (
        <div className="slider w-50 m-auto mt-5">
            <img className="d-block w-100" src={require(`./images/${activeSlide%4}.jpeg`)} alt="slider item"/>
            <div className="text-center mt-5">Active slide {activeSlide}</div>
            {autoplay && <div className="text-center mt-5">Autoplay</div>}
    
        <div className="d-flex mt-5 justify-content-between">
            <button className="btn btn-primary" onClick={()=>changeSlide(-1)}>prev slide</button>
            <button className="btn btn-primary" onClick={()=>toggleAutoplay()}>autoplay</button>
            <button className="btn btn-primary" onClick={()=>changeSlide(1)}>next slide</button>
        </div>
    </div>
    )
}


export default SliderFunctionalComponent;