export const HEADER_QUERY_CONSTANT =
  '{navbarCollection(locale: "locale-key"){items{ navbarUrl navbarTitle}}}';

export const HOME_PAGE_QUERY_CONSTANT =
  '{homepageBannerCollection(locale: "locale-key"){ items{carouselBannerImg { title description contentType fileName size url width height } alt }}}';

export const FORM_QUERY_CONSTANT =
  '{ homeFormComponentCollection(locale: "locale-key"){ items { title description }}}';

export const DETAILS_CARD_QUERY_CONSTANT =
  '{detailsCardsCollection(locale: "locale-key"){items{ title text }}}';

export const STUDENT_STORIES_QUERY_CONSTANT =
  '{ studentStoriesCollection{items{ studentImage{ url } alt }}}';

export const STUDENT_SAYING_QUERY_CONSTANT =
  '{studentSayingsCollection(locale: "locale-key"){ items{ heading body footer }}}';

export const COURSES_QUERY_CONSTANT =
  '{ coursesTemplateCollection { items { heading type1 type2 type3 iconType } } }';

export const FOOTER_QUERY_CONSTANT =
  '{ footerCollection{ items{ title categories1 categories2 categories3 categories4 categories5 categories6 categories7 noroboTag } } }';

export const ASKIDP_QUERY_CONSTANT = 
`{ askIdpCollection{ items{ person{ url } question } } }`;

// export const homeConstant = {
//   headerQueryConstant,
//   homePageBannerQueryConstant,
//   formComponentQueryConstant,
//   detailCardQueryConstant,
//   studentStoryQueryConstant,
//   studentSayingQueryConstant,
//   courseTemplateQueryConstant,
//   footerQueryConstant,
//   askIdpQueryConstant
// };
