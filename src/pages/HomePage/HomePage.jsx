import './homePage.css'
import { Link } from 'react-router-dom';
import { Route, Routes, useNavigate } from 'react-router-dom';



export const HomePage = () => { 
    const navigate = useNavigate();
    return (
    <div className="home_container">
        <div className='home_image_container'>
        <img className="home_image" src="https://rare-gallery.com/uploads/posts/4503679-assassin039s-creed-egypt-pyramids-of-giza-bayek-eagle-ubisoft-landscape-boat-river-nile-video-games-sphynx-assassin039s-creed-origins.jpg"/>
        </div>
        <h2 className="home_greeting">Добро пожаловать в интернет-магазин древнеегипетской атрибутики <span className="home_greeting_site_title">"Амон Ра"</span>!</h2> 
        <div className='home_description_wrapper'>
        <p className="home_description">Древнеегипетская цивилизация - одна из самых ранних и загадочных в истории человечества. Культура древних египтян была по-истине самобытной:</p>
        <p className="home_description">пирамиды, сфинксы, мумии, загадочная письменность, особая манера в живописи; - 
        и все это овеяно поклонением как Солнцу, так и Тьме.</p>
        <p className="home_description">Отсюда и два главных цвета древнеегипетского искусства: золотой и черный. Золотой - символ Солнца; его божеством у египтян был Амон-Ра, верховный бог.</p>
        <p className="home_description">В то время как черный символизирует Тьму ночи и связанный с ней благоговейный страх перед неизведанным.</p>
       </div>
        <h3 className='home_motto'>Ощутите мистику Древнего Египта, приобретя товары на нашем сайте!</h3>
        <ul className="home_categories_list"> <em className='home_categories_list_title'>У нас вы найдете:</em>
            <li>Предметы интерьера (декоративные статуэтки, папирусы, постельное белье, гобелены)</li>
            <li>Ювелирные украшения и аксессуары с древнеегипетской тематикой</li>
            <li>Книги по тематике Древнего Египта (история, язык, литературные произведения)</li>   
        </ul>
        

       <button className='home_catalogue_link_button' onClick={() => navigate('/catalog')}>Каталог товаров</button> 
    


    </div>
    )

    
  };