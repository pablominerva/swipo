class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            scene: -1,
            problem_name: [],
            problem_img: [],
            problem_desc: [],
            problem_id: [],
            day_op: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({
            day_op: event.target.value
        });
      } 

    handleSubmit(event) {
        event.preventDefault();
        $.ajaxSetup({ 
            beforeSend: function(xhr, settings) {
                function getCookie(name) {
                    var cookieValue = null;
                    if (document.cookie && document.cookie != '') {
                        var cookies = document.cookie.split(';');
                        for (var i = 0; i < cookies.length; i++) {
                            var cookie = jQuery.trim(cookies[i]);
                            // Does this cookie string begin with the name we want?
                            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                break;
                            }
                        }
                    }
                    return cookieValue;
                }
                if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                    // Only send the token to relative URLs i.e. locally.
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            } 
        });
        $.ajax( 
        { 
            url: `/push/day`,
            type:"POST", 
            data:{ 
                opinion: this.state.day_op
                }, 
        
        success: function() {
            console.log("thanks for that :)");
        }
    });
        this.setState({
            scene: 0
        });
      }

      postData(p_id, p_val) {
        $.ajaxSetup({ 
            beforeSend: function(xhr, settings) {
                function getCookie(name) {
                    var cookieValue = null;
                    if (document.cookie && document.cookie != '') {
                        var cookies = document.cookie.split(';');
                        for (var i = 0; i < cookies.length; i++) {
                            var cookie = jQuery.trim(cookies[i]);
                            // Does this cookie string begin with the name we want?
                            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                break;
                            }
                        }
                    }
                    return cookieValue;
                }
                if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                    // Only send the token to relative URLs i.e. locally.
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            } 
        });
        $.ajax( 
        { 
            url: `/push/count`,
            type:"POST", 
            data:{ 
                p_id: p_id,
                value: p_val
                }, 
        
        success: function() {
            console.log("thanks for that :)");
        }
    });
      }

    componentDidMount(){
        fetch("/fetch")
            .then(response => response.json())
            .then(data => {
                if (data["posts"] == "nop"){
                    this.state.play = false;
                } else{
                data["posts"].forEach(problem=>{
                    this.state.problem_name.push(problem.problem_name);
                    this.state.problem_desc.push(problem.problem_desc);
                    this.state.problem_img.push(new Image().src=problem.problem_img);
                    this.state.problem_id.push(problem.problem_id);
                })}
            });
    }

    render() {
        if (this.state.scene == -1){
            return this.renderDay();
        }
        if (this.state.scene == -2){
            return this.renderOpinion();
        }
        else if (this.state.num == 10) {
            return this.renderSolution();
        }
        else if (this.state.scene > -1) {
            return this.renderProblems();
        }
        else {
            return this.renderNext();
        };
    }

    renderOpinion() {
        return (
            <div>
                <div className="informer fr ac cent">
                    <form onSubmit={this.handleSubmit} className="fc cent">
                        <label>
                        <p> Why was your day <span role="img" aria-label="construction">😢</span>?</p>
                        <textarea value={this.state.day_op} onChange={this.handleChange} />
                        </label>
                        <button className="cent"
                            onClick={this.handleSubmit}
                            type="submit"
                            value="Submit"
                            >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    renderDay() {
        return (
            <div>
                <div className="informer fc ac cent">
                    <div className="cent">
                        <h4 className="p_name"> How was your day? </h4>
                    </div>
                    <div className="responses fr">
                        <div className="left">
                            <button value="sad" onClick={e => this.readyOPN()}> <span role="img" aria-label="construction">😢</span> </button>
                        </div>
                        <div className="right">
                            <button value="happy" onClick={e => this.readyBTN()}> <span role="img" aria-label="construction">😃</span> </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderProblems() {
        
        return (
            <div>
                <div className="informer fc ac cent">
                    <div className="top_cent">
                        <h3> How do you feel about? </h3>
                    </div>
                    <div className="center cent">
                        <span className="p_image">
                            <img src={this.state.problem_img[this.state.scene]}></img>
                        </span>
                        <h4 className="p_name"> {this.state.problem_name[this.state.scene]} </h4>
                        <span className="bg_name"></span>
                        <span className="p_desc">
                            <p> {this.state.problem_desc[this.state.scene]} </p>
                        </span>
                    </div>
                    <div className="responses fr">
                        <div className="left">
                            <button className="no_btn" name="sad" value={this.state.problem_id[this.state.scene]} onClick={e => this.gameBTN(e)}> <span role="img" aria-label="tear">😭</span> </button>
                        </div>
                        <div className="quest">
                            <button className="qs_btn" name="idk" value={this.state.problem_id[this.state.scene]} onClick={e => this.gameBTN(e)}> <span role="img" aria-label="question">❓</span> </button>
                        </div>
                        <div className="right">
                            <button className="yes_btn" name="happy" value={this.state.problem_id[this.state.scene]} onClick={e => this.gameBTN(e)}> <span role="img" aria-label="love">😍</span> </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderSolution(){
 
        return (
            <div>
                <div id="winner" className="fc ac cent">
                    <h4> FINAL PRODUCT </h4>
                    <button value="yo" onClick={e => this.readyBTN()}> </button>
                </div>
            </div>
    
        );}

    renderNext() {
        return (
            <div>
                <p> coolo </p>
                <button value="yo" onClick={e => this.readyBTN()}> </button>
            </div>
            );
    }

    readyBTN = () => {
        tippy('.no_btn', {
            content: 'A problem',
            });
        tippy('.qs_btn', {
            content: 'IDK',
            }); 
        tippy('.yes_btn', {
            content: 'No probs',
            });
        this.setState(state => ({
            scene: state.scene + 1,
        }))
    
    };

    gameBTN = (e) => {
        tippy('.no_btn', {
            content: 'A problem',
            });
        tippy('.qs_btn', {
            content: 'IDK',
            }); 
        tippy('.yes_btn', {
            content: 'No probs',
            });
        this.postData(e.target.value, e.target.name);
        this.setState(state => ({
            scene: state.scene + 1,
        }))
    
    };

    readyOPN = () => {
        this.setState( () => ({
            scene: -2,
    }))
    }

}

/* $(function(){
    "#can we fetch the user by just loading their object into serializer?! ooo"
    fetch(`search/load/?&query=&start=0&end=10&country=${req.user.country.name}`)
    .then(response => response.json())
    .then(data => {
        films = data["posts"];
    });
});   */
$(document).ready(function () {
    tippy('.no_day_btn', {
        content: 'Meh',
      });
      tippy('.yes_day_btn', {
        content: 'Good.Good',
      });
    })

ReactDOM.render(<App />, document.querySelector("#story"));
