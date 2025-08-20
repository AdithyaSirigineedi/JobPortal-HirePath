import { Button, Result } from 'antd';
import '../css/error.css';
const ErrorPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    className="result-container"
    extra={<Button onClick={() => window.history.back()} className="back-btn">Back Home</Button>}
  />
);
export default ErrorPage;