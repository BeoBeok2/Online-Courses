import Styles from '@/styles/banner.module.css';


type Props = {
    title: string;
  };

export default function Banner (props: Props){
    

  return (
    <>
        <section className={Styles.main_title_section_wrapper}>  
            <div className={Styles.main_title_section_bg}></div>  
                <div className={Styles.container_banner}>
                  	<div className={Styles.main_title_section}>
                        <h1>{props.title}</h1>
                    </div>
                    <div className={Styles.breadcrumb}>
                        <a href="http://localhost:8080"> Home </a>
                        <span className={Styles.fa_default}></span>
                        <span className={Styles.current}>{props.title}</span>
                    </div>  
                </div>
        </section>
    </>
  );
};
