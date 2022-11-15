import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import { Image } from "antd";
import HTMLRenderer from "react-html-renderer";
import { Link } from "react-router-dom";
import Header from "../../component/Header";

function JobDetail(props) {
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    getJobDetail();
  }, []);

  const getJobDetail = () => {
    axios
      .get(
        `http://dev3.dansmultipro.co.id/api/recruitment/positions/${props.match.params.id}`
      )
      .then(function (response) {
        setDetail(response.data);
      });
  };

  return (
    <div className="App">
      <Header />
      <body className="App-body">
        <Link className="App-detail-back" to={`/`}>
          <div>{"<<"}</div>
          <div className="text-back">Back</div>
        </Link>
        <div className="App-detail-job">
          <div className="text-type">{`${detail?.type}/${detail?.location}`}</div>
          <div className="text-job">{detail?.title}</div>
          <div className="content-detail">
            <div className="flex1">
              <HTMLRenderer
                html={detail?.description}
                components={{
                  h1: (Comp) => (props) => <Comp {...props} color="blue" />,
                  // p: Subheading,
                }}
              />
            </div>
            <div className="image-job">
              <Image width={200} src={detail?.company_logo} />
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default JobDetail;
