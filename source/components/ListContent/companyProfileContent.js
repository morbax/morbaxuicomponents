// Icons
import employeesIcon from '../../theme/assets/company_icons/employess.svg';
import legalIcon from '../../theme/assets/company_icons/legal-entity.svg';
import industryIcon from '../../theme/assets/company_icons/industry.svg';
import registerIcon from '../../theme/assets/company_icons/register.svg';
import websiteIcon from '../../theme/assets/company_icons/website.svg';
import sectorIcon from '../../theme/assets/company_icons/sector.svg';

export const profileToProps = (
    {
        registration_number,
        employee_number,
        legal_entity,
        sub_industry,
        industry,
        website,
    }) => {
    return [
        {
            icon: industryIcon,
            text: 'Industry :',
            value: industry,
        },
        {
            icon: sectorIcon,
            text: 'Sub-industry :',
            value: sub_industry,
        },
        {
            icon: employeesIcon,
            text: 'Employees :',
            value: employee_number,
        },
        {
            icon: legalIcon,
            text: 'Legal entity',
            value: legal_entity,
        },
        {
            icon: registerIcon,
            text: 'Company registration number :',
            value: registration_number,
        },
        {
            icon: websiteIcon,
            text: 'Company website :',
            value: website,
        },
    ];
};

export const mockedData = {
    registration_number: 10234567,
    employee_number: 'Enterprise(>1500)',
    legal_entity: 'Corporation',
    sub_industry: 'Diversfield Real Estate Activities',
    industry: 'Real Estate Management&Development',
    website: 'www.wework.com',
};
