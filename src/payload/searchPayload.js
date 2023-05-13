export let searchPayload = {
  page_name: 'omni-search',
  email: 'ttpvt_home2@yopmail.com',
  device_uuid: '123456789',
  cognito_uuid: '4ae24f94-6fbe-4a8f-a028-1e07f53f7b58',
  student_uuid: 'b23ec993-30f3-4585-a43b-6e90e7d52d80',
  //searchPayload.key_attributes.search_criteria.subject_keyword
  //searchPayload.key_attributes.search_criteria.qualification
  component_name: {
    'app-module-header': [
      {
        'component-name': 'title',
        'display-name': 'Title',
      },
      {
        'component-name': 'no-of-results',
      },
    ],
    'app-module-search-filter': [
      {
        'component-name': 'course-sort',
        'display-name': 'Sort',
      },
      {
        'component-name': 'course-filter',
        'display-name': 'Filters',
      },
      {
        'component-name': 'guidance-filter',
        'display-name': 'More filters',
      },
      {
        'component-name': 'search-options',
        'display-name': 'Search Options',
      },
    ],
    'app-module-omni-search': [
      {
        'component-name': 'dynamic-omni-search-courses-component',
        'api-name': 'RECOMMENDATION_ENGINE',
        'display-name': 'Courses',
      },
      {
        'component-name': 'dynamic-omni-search-institution-component',
        'api-name': 'COURSE_CLOUD',
        'display-name': 'Institutions',
      },
      {
        'component-name': 'dynamic-omni-search-guidance-component',
        'api-name': 'CONTENTFUL_ARTICLE',
        'display-name': 'Guidance',
      },
      {
        'component-name': 'dynamic-omni-search-subject-article-component',
        'api-name': 'CONTENTFUL_SUBJECTS',
        'display-name': 'Subject Guides',
      },
    ],
  },
  module_name: [
    'app-module-header',
    'app-module-search-filter',
    'app-module-omni-search',
  ],
  key_attributes: {
    search_criteria: {
      subject_keyword: '',
      search_options: 'all results',
      subjects: [
        {
          subject_id: '',
          subject_name: '',
        },
      ],
      country: [],
      qualification: [],
      intake_year: [],
      on_campus_accommodation: [],
      internship: [],
      scholarship: [],
      topic: [],
    },
    course_id: '',
    article_id: '',
    list_id: '',
    list_type_id: '',
    opportunity_id: '',
    institution_id: '',
    institution_name: '',
    page_no: '1',
    records_per_page: '5',
    destination: [
      {
        country_id: 'CNTRY_1001',
        country_name: 'Australia',
        country_code: 'AUS',
      },
    ],
    subject_area: [],
    sort_option: '',
  },
};
