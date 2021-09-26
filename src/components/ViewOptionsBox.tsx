import { useCallback, useEffect, useRef } from "react";
import { ViewOptionsEnum } from "../App";

interface ViewOptionsBoxProps {
	handleClick: (event: any, isOptionClick: boolean) => void;
}

export const ViewOptionsBox = (props: ViewOptionsBoxProps) => {
	const ref = useRef(null);

	const handleClick = useCallback(
		(event: any) => {
			const path = event.path || (event.composedPath && event.composedPath());
			const parentOfEvent = path[1];
			if (ref.current && ref.current === parentOfEvent) {
				props.handleClick(event, true);
			} else {
				props.handleClick(event, false);
			}
		},
		[props]
	);

	useEffect(() => {
		// for listening to clicks inside and outside of options box
		document.addEventListener("click", handleClick, true);
		return () => {
			document.removeEventListener("click", handleClick, true);
		};
	}, [handleClick]);

	return (
		<div className='view-options-box' ref={ref}>
			<div>{ViewOptionsEnum.ALL}</div>
			<div>{ViewOptionsEnum.DONE}</div>
			<div>{ViewOptionsEnum.UNDONE}</div>
		</div>
	);
};
