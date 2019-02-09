// Icons
import experienceIcon from '../../theme/assets/vacancy_icons/expirience.svg';
import locationIcon from '../../theme/assets/vacancy_icons/location.svg';
import companyIcon from '../../theme/assets/vacancy_icons/company.svg';
import sectorIcon from '../../theme/assets/vacancy_icons/sector.svg';
import salaryIcon from '../../theme/assets/vacancy_icons/salary.svg';
import yearsIcon from '../../theme/assets/vacancy_icons/years.svg';
import dateIcon from '../../theme/assets/vacancy_icons/date.svg';

export const vacancyToProps = (
    {
        company_name,
        time_create,
        salary_min,
        salary_max,
        residence,
        iso_code,
        age_max,
        age_min,
        exp_min,
        exp_max,
        sector,
    }) => {
    return [
        {
            icon: locationIcon,
            text: 'Location :',
            value: residence,
        },
        {
            icon: yearsIcon,
            text: 'Years range :',
            value: `${age_min} - ${age_max}`,
        },
        {
            icon: salaryIcon,
            text: 'Salary range :',
            value: `${salary_min} - ${salary_max} ${iso_code}`,
        },
        {
            icon: experienceIcon,
            text: 'Work experience',
            value: `${exp_min} - ${exp_max}`,
        },
        {
            icon: sectorIcon,
            text: 'Sector :',
            value: sector,
        },
        {
            icon: companyIcon,
            text: 'Company name :',
            value: company_name,
        },
        {
            icon: dateIcon,
            text: 'Posted :',
            value: time_create,
        },

    ];
};

export const mockedData = {
    residence: 'New York, United States of America, 32',
    time_create: 'Tue, 15 May 2018 Yuliana Wework',
    company_name: 'Wework',
    industry: 'Selling',
    salary_max: 10000,
    salary_min: 1000,
    iso_code: 'USD',
    age_min: 23,
    age_max: 34,
    exp_min: 1,
    exp_max: 6,
};
