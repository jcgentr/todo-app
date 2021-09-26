import { useState } from "react";
import { ViewOptionsEnum } from "../App";
import ArrowDown from "../images/arrow-down.svg";
import { ViewOptionsBox } from "./ViewOptionsBox";

interface ViewOptionsProps {
	view: string;
	setView: (view: ViewOptionsEnum) => void;
}

export const ViewOptions = (props: ViewOptionsProps) => {
	const [show, setShow] = useState(false);

	const handleOptionClick = (event: any, isOptionClick: boolean) => {
		event.stopPropagation();
		if (isOptionClick)
			props.setView(event.target.textContent as ViewOptionsEnum);
		setShow(false);
	};

	return (
		<div className='custom-select' onClick={() => setShow(!show)}>
			<div>{props.view}</div>
			<img src={ArrowDown} alt='View Options' />
			{show && <ViewOptionsBox handleClick={handleOptionClick} />}
		</div>
	);
};
