const CoursesService = {
    addCoursesData: ({courseUrl, payload}) => {
      return fetch(courseUrl, payload);
    },
  };
  
  const { addCoursesData } = CoursesService;
  
  export { addCoursesData };