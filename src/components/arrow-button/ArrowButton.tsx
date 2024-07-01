import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type TArrowButton = {
	OnClick: () => void;
	isOpen: boolean;
}

export const ArrowButton = ({isOpen, OnClick}: TArrowButton) => {
	const classToggleButtonOpen = clsx({
		[styles.container] : true,
		[styles.container_open] : isOpen
	})

	const classToggleArrowOpen = clsx({
		[styles.arrow] : true,
		[styles.arrow_open] : isOpen
	})
	
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={classToggleButtonOpen}
			onClick={OnClick}>
			<img src={arrow} alt='иконка стрелочки' className={classToggleArrowOpen} />
		</div>
	);
};