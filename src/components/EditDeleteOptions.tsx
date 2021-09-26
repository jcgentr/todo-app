import { useCallback, useEffect, useRef } from "react";
import { TaskOptions } from "./TodoItem";

interface EditDeleteOptionsProps {
	handleClick: (optionClicked: string) => void;
}

export const EditDeleteOptions = (props: EditDeleteOptionsProps) => {
	const ref = useRef(null);

	const handleClick = useCallback(
		(event: any) => {
			event.stopPropagation();
			const path = event.path || (event.composedPath && event.composedPath());
			const parentOfEvent = path[1];
			if (ref.current && ref.current === parentOfEvent) {
				const optionClicked = event.target.textContent;
				props.handleClick(optionClicked);
			} else {
				props.handleClick("");
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
		<div className='task-options-box' ref={ref}>
			<div>{TaskOptions.EDIT}</div>
			<div className='delete-button'>{TaskOptions.DELETE}</div>
		</div>
	);
};
