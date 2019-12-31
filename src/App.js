import React from 'react';
import './App.css';
import api from './api';
import PostView from './Components/PostView'

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      content: '',
      results: [],  //results라는 이름의 배열 형식 state를 만든다
    }
  }

  //데이터 요청
  componentDidMount(){
    this.getPosts() //데이터를 요청하는 함수를 호출
  }

  async getPosts(){ //데이터를 요청하는 함수
    const _results = await api.getAllPosts() //api를 이용해서 데이터를 받아온다
    console.log(_results)
    this.setState({results: _results.data}) //받아온 결과
  }
  handlingChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handlingSubmit = async (event) => {
    event.preventDefault() //event의 기본 기능
    let result = await api.createPost({title:this.state.title, content:this.state.content})
    console.log("완료됨!", result)
    this.setState({title:'', content:''})
    this.getPosts() 
  }

  handlingDelete = async (id) => {
    await api.deletePost(id)
    this.getPosts()
  }

  render(){
    return(
    <div className="App">
      <Container maxWidth="lg">
      <div className="PostingSection">
        <Paper className="PostingPaper">
        <h2>숨(어)듣(는)명(곡) 추천하기</h2>
        <form className="PostingForm" onSubmit={this.handlingSubmit}>

        <TextField
          id="outlined-multiline-flexible"
          label="노래 제목 - 가수"
          name="title"
          multiline
          rowsMax="4"
          value={this.state.title}
          onChange={this.handlingChange}
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-multiline-flexible"
          label="왜 좋아하나요"
          name="content"
          multiline
          rows="4"
          rowsMax="4"
          value={this.state.content}
          onChange={this.handlingChange}
          margin="normal"
          variant="outlined"
        />
          <Button variant="contained" color="primary" type="submit">숨듣명 추천하기</Button>
          </form>
          </Paper>
      </div>
      
      <div className="ViewSection">
        { //받아온 데이터가 웹에 보이도록 작성
          this.state.results.map((post) =>
           
          <Card className={'card'}>
            <CardContent>
              <Typography>
                <PostView key={post.id} id={post.id} title={post.title} content={post.content} />
              </Typography>
            </CardContent>
            <CardActions>
              <Button color="secondary" size="small" value={post.id} onClick={(event)=>this.handlingDelete(post.id)}>삭제하기</Button>
            </CardActions>
          </Card>
          )
        }
      </div>
    </Container>
    </div>
    
  );
  }
}

export default App;
