const AboutSection = () => {
    return (
        <div className="bg-white rounded-lg p-8 border border-orange-200">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-orange-900">About Liftuplabs</h1>
                <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-orange-300 rounded-lg text-orange-700 hover:bg-orange-50">
                        <span>🔒</span>
                        <span>Privacy</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                        <span>❓</span>
                        <span>Help Center</span>
                    </button>
                </div>
            </div>

            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                <H2></H2>Shivaaradhya Foundation</H2> – United to Empower, Transform Lives, and Redefine Tomorrow

Shivaaradhya Foundation is a visionary NGO committed to uplifting communities through education, welfare, and sustainability. Guided by compassion and innovation, we aim to bring educational awareness, inspire a purposeful way of living, and drive meaningful change in society.
            </p>

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-orange-900 mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                    Liftuplabs brings events, collaborative learning, and academic content together so learners can discover, participate, and grow in one place.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <span className="text-orange-600 text-xl">🎯</span>
                        </div>
                        <h3 className="font-medium text-gray-900 mb-2">Host and discover events</h3>
                    </div>

                    <div className="text-center p-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <span className="text-orange-600 text-xl">📝</span>
                        </div>
                        <h3 className="font-medium text-gray-900 mb-2">Share notes & PYQs</h3>
                    </div>

                    <div className="text-center p-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <span className="text-orange-600 text-xl">📚</span>
                        </div>
                        <h3 className="font-medium text-gray-900 mb-2">Learn with courses & lectures</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutSection
