import React from 'react'

const Faq = () => {
    return (
        <div className='py-12 sm:py-20 mx-auto w-[50%]'>
            <div className="collapse collapse-arrow bg-primary borderb  border-primary">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium border border-b-primary">Click to open this one and close others</div>
                <div className="collapse-content bg-white border border-primary">
                    <p>hello</p>
                </div>
            </div>
            {/* <div className="bg-base-200 collapse">
                <input type="radio" name="my-accordion-2"/>
                <div
                    className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                    Click me to show/hide content
                </div>
                <div
                    className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                    <p>hello</p>
                </div>
            </div> */}
            <div className="collapse collapse-arrow border border-primary">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium border border-b-primary">Click to open this one and close others</div>
                <div className="collapse-content">
                    <p>hello</p>
                </div>
            </div>
        </div>
    )
}

export default Faq