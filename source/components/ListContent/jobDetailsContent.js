export const jobDetailsToProps = (
    {
        employment_type,
        departmentName,
        created_at,
        salary_min,
        salary_max,
        iso_code,
        age_max,
        age_min,
        exp_min,
        exp_max,
        gender,
        degree,
        user,
    }) => [
    {
        text: 'Client Name :',
        value: user,
    },
    {
        text: 'Contact Person :',
        value: user,
    },
    {
        text: 'HR manager :',
        value: user,
    },
    {
        text: 'Age range :',
        value: `${age_min} - ${age_max}`,
    },
    {
        text: 'Gender :',
        value: gender,
    },
    {
        text: 'Posted :',
        value: created_at,
    },
    {
        text: 'Author :',
        value: user,
    },
    {
        text: 'Work Experience :',
        value: `${exp_min} - ${exp_max}`,
    },
    {
        text: 'Min degree :',
        value: degree,
    },
    {
        text: 'Residence :',
        value: user,
    },
    {
        text: 'Contract type :',
        value: (function () {
            return `
                ${employment_type.shift_work ? 'Shift work' : ''}
                ${employment_type.full_time ? 'Full time' : ''}
                ${employment_type.part_time ? 'Part time': ''}
                ${employment_type.remote ? 'Remote work' : ''}
            `;
        }()),
    },
    {
        text: 'Working hours :',
        value: '10:00 AM - 05:00 PM',
    },
    {
        text: 'Salary range :',
        value: `${salary_min} - ${salary_max} ${iso_code}`,
    },
    {
        text: 'Department :',
        value: departmentName,
    }
];

export const mockedData = {
    created_at: '18.10.2018 12:55',
    degree: 'secondary education',
    departmentName: 12312312,
    employment_type: {
        shift_work: false,
        full_time: true,
        part_time: true,
        remote: true,
    },
    user: 'Михаил Ворона',
    salary_max: 40000,
    salary_min: 1000,
    iso_code: 'USD',
    gender: 'male',
    age_max: 36,
    age_min: 22,
    exp_min: 1,
    exp_max: 6,
};
