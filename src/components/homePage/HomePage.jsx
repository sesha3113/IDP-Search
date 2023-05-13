import React from "react";
import CarouselTabs from "@/components/carouselTabs/CarousalTabs";
import FormComponent from "@/components/formComponent/FormComponent";
import StudentStories from "@/components/studentStories/StudentStories";
import CoursesTemplate from "@/components/coursesTemplate/CoursesTemplate";
import StudentSays from "@/components/studentSays/StudentSays";
import StudentPlacesTemplate from "@/components/studyPlacesTemplete/StudentPlacesTemplate";
import UniversitiesTemplate from "@/components/universitiesTemplate/UniversitiesTemplate";
import PartnersTemplate from "@/components/partnersTemplate/PartnersTemplate";
import RecognitionsTemplate from "@/components/recognitionsTemplate/RecognitionsTemplate";
import PropTypes from 'prop-types'
import AskIdp from "../askIdp/AskIdp";

const HomePage = ({serverData}) => {
  const { homePageBannerData, detailCardData, studentStoryData, studentSayingsData, courseTemplateData, formComponentData,askidpData } = serverData;
 
  return (
    <div>
      <CarouselTabs { ...{ homePageBannerData, detailCardData } } />
      <FormComponent formComponentData={formComponentData}/>
      <StudentStories studentStoryData={studentStoryData}/>
      <AskIdp askidpData={askidpData} />
      <StudentSays studentSayingsData={studentSayingsData}/>
      <StudentPlacesTemplate />
      <CoursesTemplate courseTemplateData={courseTemplateData}/>
      <UniversitiesTemplate />
      <RecognitionsTemplate />
      <PartnersTemplate />
    </div>
  );
}

export default HomePage;

HomePage.propTypes ={
  serverData: PropTypes.object,
}
