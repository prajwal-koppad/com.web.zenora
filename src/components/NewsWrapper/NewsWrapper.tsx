import { useEffect, useState } from "react";
import ApiConstants from "../../constants/ApiConstants/ApiConstants";
import Spinner from "../../Utils/Spinner/Spinner";
import NewsCard from "../NewsCard/NewsCard";
import { IArticles, INewsModel } from "../../constants/AppConstants/INewsModel";
import { toTitleCase } from "../../Utils/CommonUtils/StringUtils";
import { AppEnums } from "../../constants/AppConstants/Enums";
import "./NewsWrapper.css";

const NewsWrapper = (props: any) => {
  const [articles, setArticles] = useState<IArticles[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page] = useState<number>(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    try {
      props.setProgress(10);
      setLoading(true);
      const url: string = ApiConstants.fetchNews(
        props.country,
        props.category,
        props.language,
        page,
        props.pageSize
      );
      const response = await fetch(url);
      console.log("fetching news..")
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const parsedData: INewsModel = await response.json();
      setArticles(parsedData?.articles);
      setTotalResults(parsedData?.totalArticles);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching news:", error);
    } finally {
      props.setProgress(100);
    }
  };

  useEffect(() => {
    document.title = `${toTitleCase(props.category)} ${AppEnums.HYPHEN} ${
      AppEnums.ZENORA
    }`;
    updateNews();
  }, []);

  return (
    <>
      <h1 className="app-header">
        Zenora - Top Headlines <small>- {toTitleCase(props.category)}</small>
      </h1>
      {loading ? (
        <Spinner />
      ) : articles.length === 0 ? (
        <h4 className="no-data">
          Sorry, No News Available, Please Try Again Later
        </h4>
      ) : (
        <div className="news-wrapper">
          <div className="news-cards">
            <div className="news-row">
              {articles.map((element) => (
                <div className="news-card-container" key={element.url}>
                  <NewsCard
                    title={element?.title || ""}
                    description={element?.description || ""}
                    imageUrl={element?.image}
                    newsUrl={element?.url}
                    author={element?.source}
                    date={element?.publishedAt}
                    totalResults={totalResults}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsWrapper;
