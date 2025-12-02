import { useState } from 'react'

const CareerHub = () => {
    const [selectedTab, setSelectedTab] = useState('jobs')

    const jobs = [
        {
            id: 1,
            company: 'TCS Digital',
            position: 'Software Engineer - Jan-June 2024',
            location: 'Multiple locations',
            type: 'Full-time',
            salary: '₹6-8 LPA',
            experience: '0-1 years',
            skills: ['Java', 'Spring Boot', 'React'],
            posted: '2 days ago'
        },
        {
            id: 2,
            company: 'Infosys',
            position: 'System Engineer - Campus Hiring',
            location: 'Bangalore, Pune, Hyderabad',
            type: 'Full-time',
            salary: '₹4-6 LPA',
            experience: 'Fresher',
            skills: ['Python', 'SQL', 'Cloud'],
            posted: '1 week ago'
        },
        {
            id: 3,
            company: 'Wipro',
            position: 'Project Engineer - WILP',
            location: 'Chennai, Mumbai',
            type: 'Full-time',
            salary: '₹5-7 LPA',
            experience: '0-2 years',
            skills: ['JavaScript', 'Node.js', 'MongoDB'],
            posted: '3 days ago'
        }
    ]

    const internships = [
        {
            id: 1,
            company: 'Microsoft',
            position: 'Software Development Intern',
            location: 'Hyderabad',
            duration: '6 months',
            stipend: '₹50,000/month',
            skills: ['C#', '.NET', 'Azure'],
            posted: '1 day ago'
        },
        {
            id: 2,
            company: 'Google',
            position: 'Data Science Intern',
            location: 'Bangalore',
            duration: '3 months',
            stipend: '₹60,000/month',
            skills: ['Python', 'TensorFlow', 'SQL'],
            posted: '4 days ago'
        }
    ]

    const resources = [
        {
            id: 1,
            title: 'Resume Building Workshop',
            type: 'Workshop',
            date: 'Dec 15, 2024',
            instructor: 'Career Counselor',
            participants: 150,
            status: 'Upcoming'
        },
        {
            id: 2,
            title: 'Interview Preparation Guide',
            type: 'Guide',
            downloads: 1200,
            rating: 4.8,
            status: 'Available'
        },
        {
            id: 3,
            title: 'Coding Interview Bootcamp',
            type: 'Course',
            duration: '4 weeks',
            enrolled: 89,
            status: 'Ongoing'
        }
    ]

    const renderJobs = () => (
        <div className="space-y-4">
            {jobs.map((job) => (
                <div key={job.id} className="bg-white border border-orange-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{job.position}</h3>
                            <p className="text-orange-600 font-medium">{job.company}</p>
                            <p className="text-gray-600 text-sm">{job.location} • {job.type}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-semibold text-green-600">{job.salary}</p>
                            <p className="text-gray-500 text-sm">{job.posted}</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Experience: {job.experience}</p>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, index) => (
                                <span key={index} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700">
                            Apply Now
                        </button>
                        <button className="border border-orange-300 text-orange-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-50">
                            Save Job
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )

    const renderInternships = () => (
        <div className="space-y-4">
            {internships.map((internship) => (
                <div key={internship.id} className="bg-white border border-orange-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{internship.position}</h3>
                            <p className="text-orange-600 font-medium">{internship.company}</p>
                            <p className="text-gray-600 text-sm">{internship.location} • {internship.duration}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-semibold text-green-600">{internship.stipend}</p>
                            <p className="text-gray-500 text-sm">{internship.posted}</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                            {internship.skills.map((skill, index) => (
                                <span key={index} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700">
                            Apply Now
                        </button>
                        <button className="border border-orange-300 text-orange-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-50">
                            Save
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )

    const renderResources = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
                <div key={resource.id} className="bg-white border border-orange-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="mb-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{resource.type}</span>
                        <h3 className="text-lg font-semibold text-gray-900 mt-2">{resource.title}</h3>
                    </div>

                    <div className="space-y-2 mb-4">
                        {resource.date && <p className="text-sm text-gray-600">📅 {resource.date}</p>}
                        {resource.instructor && <p className="text-sm text-gray-600">👨‍🏫 {resource.instructor}</p>}
                        {resource.participants && <p className="text-sm text-gray-600">👥 {resource.participants} participants</p>}
                        {resource.downloads && <p className="text-sm text-gray-600">📥 {resource.downloads} downloads</p>}
                        {resource.rating && <p className="text-sm text-gray-600">⭐ {resource.rating}/5</p>}
                        {resource.duration && <p className="text-sm text-gray-600">⏱️ {resource.duration}</p>}
                        {resource.enrolled && <p className="text-sm text-gray-600">🎓 {resource.enrolled} enrolled</p>}
                    </div>

                    <button className="w-full bg-orange-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-700">
                        {resource.type === 'Workshop' ? 'Register' : resource.type === 'Guide' ? 'Download' : 'Enroll'}
                    </button>
                </div>
            ))}
        </div>
    )

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-orange-200">
                <h1 className="text-3xl font-bold text-orange-900 mb-2">Career & Guidance</h1>
                <p className="text-gray-700">Discover job opportunities, internships, and career resources</p>
            </div>

            <div className="bg-white rounded-lg border border-orange-200">
                <div className="border-b border-orange-200">
                    <nav className="flex space-x-8 px-6">
                        {[
                            { id: 'jobs', label: 'Jobs', icon: '💼' },
                            { id: 'internships', label: 'Internships', icon: '🎓' },
                            { id: 'resources', label: 'Resources', icon: '📚' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${selectedTab === tab.id
                                    ? 'border-orange-600 text-orange-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6">
                    {selectedTab === 'jobs' && renderJobs()}
                    {selectedTab === 'internships' && renderInternships()}
                    {selectedTab === 'resources' && renderResources()}
                </div>
            </div>
        </div>
    )
}

export default CareerHub