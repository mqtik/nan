import "./App.css";

import { useEffect, useState } from "react";
import ExpandableGrid from "./components/grid";
import Select from 'react-select'
import ReactSlider from 'react-slider'

const staticImagesURL =
  "https://storage.googleapis.com/nanlabs-engineering-technical-interviews/imgix-samples-list.json";

function NaNLabsLogo(){
  return (
    <svg className="logoNaN" width="137" height="30" viewBox="0 0 137 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M59.8207 21.7313C60.3669 21.7313 60.8729 21.7113 61.298 21.6707C61.6646 21.6427 62.0295 21.5956 62.3911 21.5295V17.8867C62.0522 17.7907 61.7074 17.7166 61.3589 17.665C60.9352 17.6074 60.5077 17.5812 60.08 17.5867C59.6799 17.5893 59.2807 17.6229 58.8858 17.6872C58.5185 17.7433 58.1631 17.8591 57.8336 18.03C57.5411 18.1811 57.2855 18.3939 57.0845 18.6537C56.8765 18.9323 56.7694 19.2726 56.7806 19.6194C56.7806 20.4241 57.0437 20.968 57.5898 21.2901C58.1568 21.5923 58.8851 21.7335 59.8192 21.7335L59.8207 21.7313ZM59.5963 10.502C60.5274 10.502 61.2965 10.6224 61.9445 10.8441C62.5717 11.0657 63.0986 11.3872 63.4827 11.8098C63.8785 12.2311 64.1629 12.7435 64.3106 13.301C64.4773 13.9247 64.559 14.5679 64.5536 15.2133V22.9187C64.0274 22.9992 63.3594 23.1197 62.5093 23.2409C61.6433 23.3635 60.7697 23.4248 59.895 23.4241C59.2296 23.4256 58.5656 23.365 57.9116 23.2431C57.3088 23.137 56.7276 22.933 56.1913 22.6394C55.6983 22.3419 55.2886 21.9256 55.0001 21.429C54.6962 20.9059 54.5542 20.2616 54.5542 19.4569C54.5542 18.7527 54.7162 18.149 55.0194 17.6657C55.3214 17.1845 55.7301 16.7783 56.2143 16.4783C56.7299 16.1628 57.2994 15.9443 57.8945 15.834C58.5271 15.6962 59.1731 15.6288 59.8207 15.633C60.6864 15.633 61.5492 15.7344 62.3911 15.9352V15.3315C62.392 14.9658 62.3513 14.6012 62.27 14.2446C62.1929 13.9006 62.0407 13.5777 61.8241 13.2988C61.5785 13.0029 61.2664 12.7685 60.9131 12.6145C60.5281 12.4534 60.0429 12.3529 59.4357 12.3529C58.7635 12.348 58.0921 12.4019 57.4293 12.514C56.9838 12.5903 56.5442 12.698 56.114 12.8362L55.851 11.0251C56.1546 10.8842 56.6607 10.7635 57.3691 10.663C58.1073 10.5555 58.8524 10.5017 59.5985 10.502" fill="#FFFFFF"></path><path d="M77.6286 18.8726L71.4756 6.45508H68.8643V22.9181H71.0305V10.4999L77.1835 22.9181H79.7948V6.45508H77.6286V18.8726Z" fill="#FFFFFF"></path><path d="M49.3324 18.8726L43.1794 6.45508H42.7544H40.5889V22.9181H42.7544V10.4999L48.8873 22.9181H51.4986V6.45508H49.3324V18.8726Z" fill="#FFFFFF"></path><path d="M85.9678 6.45508H84.6518V22.9181H92.7889V21.7307V21.6302H85.9678V6.45508Z" fill="#FFFFFF"></path><path d="M101.31 6.45508L96.0474 22.9181H97.4036L98.7798 18.39H105.034L106.451 22.9181H107.807L102.524 6.45508H101.31ZM101.917 8.56838L104.65 17.1021H99.1848L101.917 8.56838Z" fill="#FFFFFF"></path><path d="M118.11 14.3246C118.785 14.0569 119.358 13.5852 119.749 12.976C120.134 12.3524 120.336 11.6076 120.336 10.7593C120.336 9.35018 119.951 8.26397 119.182 7.53909C118.413 6.81422 117.28 6.45215 115.782 6.45215H111.592V22.9152H116.268C117.725 22.9152 118.838 22.4925 119.627 21.6672C120.416 20.8418 120.801 19.715 120.801 18.2682C120.801 17.2817 120.558 16.4364 120.052 15.7122C119.566 14.9876 118.918 14.5248 118.109 14.3238L118.11 14.3246ZM115.903 13.76H112.968V7.76299H115.802C116.854 7.76299 117.664 8.00461 118.19 8.48786C118.716 8.97111 118.959 9.7152 118.959 10.7423C118.959 11.7487 118.696 12.5157 118.17 13.0167C117.624 13.4999 116.875 13.7615 115.903 13.7615V13.76ZM116.328 21.6502H112.969V15.0687H116.531C117.442 15.0886 118.171 15.3908 118.677 15.9553C119.183 16.5199 119.446 17.3039 119.446 18.2903C119.446 19.3366 119.163 20.162 118.616 20.7457C118.049 21.3494 117.278 21.6517 116.328 21.6517" fill="#FFFFFF"></path><path d="M134.12 16.6792C133.785 16.0527 133.298 15.5193 132.703 15.1275C132.075 14.6842 131.144 14.2615 129.91 13.8595C128.696 13.4568 127.805 12.9943 127.258 12.4911C126.712 11.9879 126.449 11.3435 126.449 10.5388C126.449 9.69352 126.732 8.98712 127.319 8.44549C127.886 7.90239 128.696 7.64081 129.708 7.64081C130.74 7.64081 131.57 7.96298 132.16 8.62726C132.767 9.2913 133.071 10.1568 133.071 11.2238V11.3058H134.504V11.2253C134.504 9.79623 134.058 8.60879 133.166 7.68293C132.274 6.77702 131.122 6.31445 129.725 6.31445C128.349 6.31445 127.216 6.71716 126.366 7.50189C125.496 8.28662 125.051 9.33367 125.051 10.581C125.051 11.8489 125.496 12.8753 126.388 13.66C127.057 14.2438 128.108 14.7869 129.526 15.2701C130.922 15.7327 131.894 16.2359 132.4 16.7391C132.906 17.2423 133.149 17.9465 133.149 18.8324C133.149 19.7184 132.845 20.4425 132.238 20.9856C131.631 21.5287 130.821 21.7903 129.809 21.7903C128.655 21.7903 127.725 21.4682 127.06 20.8246C126.395 20.181 126.048 19.295 126.048 18.1881V18.0876H124.631V18.1682C124.631 19.1746 124.854 20.0598 125.299 20.7847C125.745 21.526 126.399 22.1208 127.182 22.4953C127.971 22.898 128.862 23.079 129.833 23.079C131.27 23.079 132.424 22.6763 133.295 21.8916C134.166 21.1068 134.61 20.0598 134.61 18.7718C134.57 17.9871 134.428 17.2622 134.124 16.6785" fill="#FFFFFF"></path><path d="M15.6559 0.994141C7.95647 0.994141 1.70391 7.21138 1.70391 14.8673C1.70391 22.5232 7.95647 28.7434 15.6559 28.7434C23.3553 28.7434 29.6078 22.5262 29.6078 14.8702C29.6078 7.21434 23.3553 0.994141 15.6559 0.994141ZM19.8411 4.59119V20.2111L12.0131 4.38577C13.1843 3.98188 14.4147 3.77364 15.6544 3.76951C17.091 3.76376 18.5144 4.0431 19.8411 4.59119ZM4.4943 14.8673C4.49168 13.2035 4.86673 11.5606 5.59151 10.061C6.31629 8.56143 7.37211 7.24384 8.68027 6.20646V23.5252C7.3725 22.4881 6.31692 21.171 5.59216 19.6719C4.86739 18.1729 4.49212 16.5306 4.4943 14.8673ZM11.4439 25.1434V9.52345L19.2734 25.3496C18.1021 25.7535 16.8717 25.9617 15.6321 25.9658C14.1949 25.9715 12.771 25.6919 11.4439 25.1434ZM22.6315 23.5252V6.20646C23.9379 7.24479 24.9926 8.56213 25.7174 10.0609C26.4422 11.5596 26.8186 13.2013 26.8186 14.8643C26.8186 16.5274 26.4422 18.1691 25.7174 19.6678C24.9926 21.1665 23.9379 22.4839 22.6315 23.5222V23.5252Z" fill="#FFFFFF"></path></svg>
  )
}
function useImgixPictures() {
  const [pictures, setPictures] = useState(null);

  async function fetchPictures() {
    const getImages = await fetch(staticImagesURL).then((res) => res.json());
    setPictures(getImages);
  }
  useEffect(() => {
    fetchPictures();
  }, []);

  return pictures;
}
const RenderImageContent = ({ children, imageId, gridData }) => {
  const [ settings, setSettings ] = useState({
    "rot": 100,
    "orient": 0,
    "bri": 0,
    "con": 0
  })
  const imageElement = gridData[imageId];
  

  function updateSettings(setting, value) {
    setSettings(prevState => {
      return {...prevState, [setting]: value};
    });
  }
  const getSettings = Object.entries(settings)
  const RenderOptions = () => {
    return (
      <div className={"optionsBlock"}>
        {
          getSettings.map(
            ([key, value]) => <ReactSlider
            onChange={(change) => updateSettings(key, change)}
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            value={value}
            renderThumb={(props, state) => <div {...props}>{key.charAt(0).toUpperCase()}: {state.valueNow}</div>}
        />
        )
        }
          
      </div>
    )
  }
  function getUrlByFilterSettings(imageElement){
    if(!imageElement || (!imageElement.url)){
      return '';
    }
    let newUrl = getSettings.map(([key, val]) => `${key}=${val}`).join('&');
    if(newUrl){
      imageElement.url += `?${newUrl}`;
    }
    return imageElement.url;
  }
  return <div>
    {children}
    
      <div className={"imageExpandedContainer"}>
        <img src={getUrlByFilterSettings(imageElement)} />
        <RenderOptions />
      </div>
    </div>;
};

function Grid({ gridData }) {
  
  return (
    <ExpandableGrid
      gridData={gridData}
      detailHeight={300}
      detailBackgroundColor={"#566df4"}
      ExpandedDetail_image_size={300}
      cellSize={250}
      RenderImageContent={(props) => <RenderImageContent {...props} gridData={gridData}/>}
    />
  );
}
function Header(){
  return (
    <div className="header">
      <NaNLabsLogo />
    </div>
  )
}
function App() {
  const imgixPics = useImgixPictures();
  return (
    <div className="App">
      <Header />
      <div className="credits">
       <h1><span>Coding</span> challenge</h1>
       <h2>By Matias Fort</h2>
       <h3><a href="mailto:m@tias.xyz">m@tias.xyz</a> - <a href="https://tias.xyz" target="_blank">https://tias.xyz</a></h3>
      </div>
      {imgixPics && <Grid gridData={imgixPics} />}
      </div>
  );
}

export default App;
