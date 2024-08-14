import { Link, useNavigate, useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import { RingProgress, SegmentedControl, ScrollArea } from '@mantine/core';
import { useState } from "react";
import JobButton from "../components/JobButton";
import ActionButton from "../components/ActionButton";

const Result = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // eslint-disable-next-line no-unused-vars
    const [value, setValue] = useState(76);
    const [show, setShow] = useState("resume");
    const { resume, jobDescription, resultData } = location.state || {};
    const [jd, setJD] = useState(jobDescription);

    const handleJobButton = (text) => {
        // console.log("text job button", text);
        setShow('jobdesc');
        setJD(text);
    }

    const handleSwitch = (value) => {
        // console.log("value switch", value);
        // setShow('');
        if (value === 'jobdesc') {
            setShow('resume')
            // setJD(jobDescription);
        } else {
            setShow('jobdesc');
            setJD(jobDescription);
        }
    }

    return (
        <div className="flex flex-col min-h-screen w-screen">
            <header>
                <nav className="flex justify-between items-center md:px-8 px-4 py-3 bg-navyGray">
                    <div className="flex lg:flex-1">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <img className="h-8 w-auto" src="/japan2.jpg" alt="" />
                        </Link>
                    </div>
                </nav>
            </header>
            <div className="flex-grow bg-slateGray">

                <div className="grid grid-cols-2">
                    <div className="">
                        {/* CONTENT KIRI */}
                        <div className="md:p-8 p-4 flex flex-col">
                            <div>
                                <p
                                    className="font-semibold text-3xl text-mintGreen"
                                >
                                    Your Result
                                </p>
                                <hr className="border-2 border-mintGreen w-40 mt-2" />
                            </div>
                            <div className="py-4 flex flex-row items-center gap-4 px-6 bg-coolGray rounded-3xl my-4">
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
                                        { value: value, color: '#3BBA9C' },
                                    ]}
                                />
                                <p
                                    className="text-white text-lg font-semibold"
                                >
                                    the match between the cv and the job description is very poor</p>
                            </div>
                            <div>
                                <p
                                    className="font-semibold text-2xl text-mintGreen"
                                >
                                    Your Resume Match With This Job Description
                                </p>
                                <hr className="border-2 border-mintGreen w-5/6 mt-2 mb-10" />
                                {resultData.map((job, index) => (
                                    <JobButton
                                        key={index}
                                        handleClick={() => handleJobButton(job.description)}
                                        title={job.title}
                                        idx={index + 1}
                                        similarity={job.distance}
                                    />
                                ))}
                                <div className="flex justify-center">
                                    <ActionButton handleClick={() => navigate('/upload')} text="Analyze More" />

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* CONTENT KANAN */}
                    <div className=" flex flex-col">
                        <div className="md:px-16 px-8 md:py-8 py-4 flex flex-col gap-4">
                            <SegmentedControl
                                color="#3BBA9C"
                                value={show}
                                onChange={() => handleSwitch(show)}
                                data={[
                                    { label: 'Your Resume', value: 'resume' },
                                    { label: 'Job Description', value: 'jobdesc' },
                                ]}
                                classNames={{
                                    root: 'bg-darkBlueGray',
                                    control: 'transition-all duration-300',
                                    label: 'text-white'
                                }}
                            />
                            <div className="bg-white rounded-2xl p-4">
                                <ScrollArea h={500}>
                                    {show === 'resume' ? (
                                        <p>{resume}</p>
                                    ) : (
                                        <p>{jd}</p>
                                    )}
                                </ScrollArea>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Result