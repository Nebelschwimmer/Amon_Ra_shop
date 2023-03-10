import './homePage.css'
import { useNavigate } from 'react-router-dom';
import { scrollOnClick } from '../../utils/utils';
import imgSrc from './tutankhamun.png';


export const HomePage = () => { 
  
    const navigate = useNavigate();
    return (
    <div className="home_container">
        <h2 className="home_greeting">Добро пожаловать в интернет-магазин древнеегипетской атрибутики <span className="home_greeting_site_title">"Амон Ра"</span>!</h2> 
        <div className='home_greeting_image_wrapper'>
            <div className='home_description_wrapper'>
                <p className="home_description">Древнеегипетская цивилизация - одна из самых ранних и загадочных в истории человечества. Культура древних египтян была по-истине самобытной:
                пирамиды, сфинксы, мумии, загадочная письменность, особая манера в живописи; - 
                и все это овеяно поклонением как Солнцу, так и Тьме.</p>
                <p className="home_description">Отсюда и два главных цвета древнеегипетского искусства: золотой и черный. Золотой - символ Солнца; его божеством у египтян был Амон-Ра, верховный бог.</p>
                <p className="home_description">В то время как черный символизирует Тьму ночи и связанный с ней благоговейный страх перед неизведанным.</p>
                <h3 className='home_motto'>Ощутите мистику Древнего Египта, приобретя товары на нашем сайте!</h3>
            <ul className="home_categories_list"> <em className='home_categories_list_title'>У нас вы найдете:</em>
                <li>Предметы интерьера (декоративные статуэтки, папирусы, постельное белье, гобелены)</li>
                <li>Ювелирные украшения и аксессуары с древнеегипетской тематикой</li>
                <li>Книги по тематике Древнего Египта (история, язык, литературные произведения)</li>   
            </ul>
            </div> 
            <div className='home_image_container'>
                <img className="home_image" src={imgSrc} alt="Homepage"/> 
            </div>
        </div> 
            <div className='home_button_wrapper'>
            <button className='home_catalogue_link_button' onClick={() => {navigate('/catalog'); scrollOnClick()}}>Каталог товаров</button> 
            </div>
            
    </div>
    )
  };