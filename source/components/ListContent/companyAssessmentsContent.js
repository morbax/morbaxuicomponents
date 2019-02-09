// Icons
import vacanciesIcon from '../../theme/assets/company_icons/open-vacancies.svg';
import employeesIcon from '../../theme/assets/company_icons/employess.svg';
import reviewIcon from '../../theme/assets/company_icons/reviews.svg';
import rateIcon from '../../theme/assets/company_icons/ratings.svg';
import priceIcon from '../../theme/assets/company_icons/price.svg';
import dateIcon from '../../theme/assets/company_icons/date.svg';
import ceoIcon from '../../theme/assets/company_icons/ceo.svg';
import ageIcon from '../../theme/assets/company_icons/age.svg';

export const assessmentToProps = (
    {
        number_of_open_vacancies,
        glassdoor_company_size,
        ceo_number_of_rate,
        number_of_reviews,
        foundation_date,
        middle_age,
        ceo_name,
        revenue,
    }) => {
    return [
        {
            icon: priceIcon,
            text: 'Company\'s price - ',
            value: revenue,
        },
        {
            icon: vacanciesIcon,
            text: 'Number of open vacancies - ',
            value: number_of_open_vacancies,
        },
        {
            icon: employeesIcon,
            text: 'The number of employees - ',
            value: glassdoor_company_size,
        },
        {
            icon: rateIcon,
            text: 'Number in ratings - ',
            value: ceo_number_of_rate,
        },
        {
            icon: dateIcon,
            text: 'Foundation date - ',
            value: foundation_date,
        },
        {
            icon: ceoIcon,
            text: 'CEO - ',
            value: ceo_name,
        },
        {
            icon: reviewIcon,
            text: 'Number of reviews - ',
            value: number_of_reviews,
        },
        {
            icon: ageIcon,
            text: 'Middle age - ',
            value: middle_age,
        }
    ];
};

export const mockedData = {
    number_of_open_vacancies: 234,
    glassdoor_company_size: '1001 to 5000 employees',
    ceo_number_of_rate: 191,
    number_of_reviews: 213,
    foundation_date: 2010,
    middle_age: 0,
    ceo_name: 'Adam Neumann',
    revenue: '',
};
