import React, { Component } from 'react';
import Newsitem from './Newsitem';

export class News extends Component {
  articles = [];

  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1, // Initialize page state
    };
  }

  async fetchArticles(page) {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=55c8fa0d19d84b77b72a5bc90ec7698c&page=${page}&pageSize=20`;
    this.setState({ loading: true });
    const data = await fetch(url);
    const parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,totalResults : parsedData.totalResults,
    });
  }

  async componentDidMount() {
    this.fetchArticles(this.state.page);
  }

  handlePrevClick = async () => {
    const newPage = this.state.page - 1;
    this.fetchArticles(newPage);
    this.setState({ page: newPage });
  };

  handleNextClick = async () => {
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

    }else{
    const newPage = this.state.page + 1;
    this.fetchArticles(newPage);
    this.setState({ page: newPage });
  }};

  render() {
    return (
      <div className="container my-3">
        <h2>Top Headlines</h2>
        <div className="row my-4">
          {this.state.articles.map((element, index) => (
            <div className="col-md-4" key={element.url + index}>
              <Newsitem
                title={element.title || ""}
                description={element.description || "..."}
                imageUrl={element.urlToImage || "https://s.yimg.com/ny/api/res/1.2/OvN6DIBDbUZkbMp8.MtJAQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://s.yimg.com/os/creatr-uploaded-images/2024-10/ab16fac0-8dbd-11ef-8eef-a08682173ddb"}
                newsUrl={element.url}
              />
            </div>
          ))}
        </div>
        <div className="container d-flex justify-content-around">
          <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previou</button>
          <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/20)} type="button"className="btn btn-dark"onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
