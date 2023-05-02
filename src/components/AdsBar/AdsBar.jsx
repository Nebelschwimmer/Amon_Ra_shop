import "./adsBar.css";

export const AdsBar = () => {
  return (
    <div>
      <div className="sideBar_wrapper">
        <p>От партнеров</p>
        <div className="sideBar_container">
          <a href="https://kochevnik.kg/selections/egipet/" target="_blank">
            <img
              className="sideBar_image"
              src="https://kochevnik.kg/wp-content/uploads/2018/01/egipetbanner18013.jpg"
              alt="Реклама"
            />
          </a>
          <a
            href="https://travelbelka.ru/tury-v-egipet-ot-14600-oteli-5-vse-vklyucheno/"
            target="_blank"
            rel="noopener"
          >
            <img
              className="sideBar_image"
              src="https://travelbelka.ru/wp-content/uploads/2022/01/EG14600ALL.png"
              alt="Реклама"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
