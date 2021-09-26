interface ProgressProps {
	completed: number;
	total: number;
}

export const Progress = (props: ProgressProps) => {
	const percentageCompleted =
		props.completed === 0 && props.total === 0
			? 0
			: Math.round((props.completed / props.total) * 100);
	return (
		<div className='progress-container'>
			<label className='progress-label' htmlFor='completed-todos'>
				Progress
			</label>
			<progress id='completed-todos' value={percentageCompleted} max='100'>
				{percentageCompleted}%
			</progress>
			<div className='completed-number'>{props.completed} completed</div>
		</div>
	);
};
