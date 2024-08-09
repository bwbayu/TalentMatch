import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { RingProgress, SegmentedControl, ScrollArea } from '@mantine/core';
import { useState } from "react";
import JobButton from "../components/JobButton";
import ActionButton from "../components/ActionButton";

const Result = () => {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [value, setValue] = useState(33);
    const [show, setShow] = useState("");
    const data = [
        {
            'idx': 1,
            'title': 'Data Science',
            'similarity': '0.8921'
        },
        {
            'idx': 2,
            'title': 'Data Engineer',
            'similarity': '0.8921'
        },
        {
            'idx': 3,
            'title': 'Frontend Developer',
            'similarity': '0.8921'
        },
        {
            'idx': 4,
            'title': 'Backend Developer',
            'similarity': '0.8921'
        },
        {
            'idx': 5,
            'title': 'Security Analyst',
            'similarity': '0.8921'
        },
    ];

    return (
        <div className="bg-white flex flex-col min-h-screen w-screen">
            <header>
                <nav className="flex justify-between items-center md:px-8 px-4 py-3 bg-gray-600">
                    <div className="flex lg:flex-1">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <img className="h-8 w-auto" src="public/japan2.jpg" alt="" />
                        </Link>
                    </div>
                </nav>
            </header>
            <div className="grid grid-cols-2">
                <div className="bg-red-200">
                    <div className="md:p-8 p-4 flex flex-col">
                        <div>
                            <p
                                className="font-semibold text-3xl"
                            >
                                Your Result
                            </p>
                            <hr className="border border-black w-40" />
                        </div>
                        <div className="py-4 flex flex-row items-center gap-4 px-6">
                            <RingProgress
                                size={120}
                                thickness={12}
                                roundCaps
                                label={
                                    <p className="flex justify-center items-center font-bold">
                                        {value}%
                                    </p>
                                }
                                sections={[
                                    { value: 33, color: 'cyan' },
                                ]}
                            />
                            <p>the match between the cv and the job description is very poor</p>
                        </div>
                        <div>
                            <p
                                className="font-semibold text-2xl"
                            >
                                Your Resume Match With This Job Description
                            </p>
                            <hr className="border border-black w-5/6" />
                            {data.map((job, index) => (
                                <JobButton
                                    key={index}
                                    handleClick={() => console.log(`Job ${index + 1} clicked`)}
                                    title={job.title}
                                    idx={index + 1}
                                    similarity={job.similarity}
                                />
                            ))}
                            <div className="flex justify-center">
                                <ActionButton handleClick={() => navigate('/upload')} text="Analyze More" />

                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-blue-200 flex flex-col">
                    <div className="md:px-16 px-8 md:py-8 py-4 flex flex-col gap-4">
                        <SegmentedControl
                            value={show}
                            onChange={setShow}
                            defaultValue="Your Resume"
                            data={[
                                { label: 'Your Resume', value: 'resume' },
                                { label: 'Job Description', value: 'jobdesc' },
                            ]}
                        />
                        <div className="bg-green-200 border border-slate-50 rounded-md p-4">
                            <ScrollArea h={200}>
                                {show}
                            </ScrollArea>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Result