import LoadingLogo from '../images/loading.lottie';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import '../css/loading.css';

const Loading = () => {
  return (
    <>
    <div class="loading-card">
      <DotLottieReact
      src={LoadingLogo}
      loop
      autoplay className="loading-logo"
    />
    <br/>
    <h3 className="some-text">Please wait the page is loading...</h3>
    </div>
    </>
  )

}
export default Loading;