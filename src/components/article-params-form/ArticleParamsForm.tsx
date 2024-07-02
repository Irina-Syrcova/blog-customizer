import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Text } from '../text';
import { Select } from '../select';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

export let userSettings = defaultArticleState;

type UseOutsideClick = {
	isMenuOpen: boolean;
	rootRef: React.RefObject<HTMLDivElement>;
};

type TFormProps = {
	setNewSettings: (value: ArticleStateType)=> void
}

export const ArticleParamsForm = (props: TFormProps)  => {
	const { setNewSettings } = props;
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	function OnClick() {
		setIsMenuOpen(isMenuOpen === false? true : false)
	}

	const classToggleForm = clsx({
		[styles.container] : true,
		[styles.container_open] : isMenuOpen
	})

	const [selectedFontFamily, setSelectedFontFamily] = useState(defaultArticleState.fontFamilyOption);
	const [selectedFontColor, setSelectedFontColor] = useState(defaultArticleState.fontColor);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(defaultArticleState.backgroundColor);
	const [selectedWidth, setSelectedWidth] = useState(defaultArticleState.contentWidth);
	const [selectedFontSize, setSelectedFontSize] = useState(defaultArticleState.fontSizeOption);

	userSettings = {
		fontFamilyOption: selectedFontFamily,
		fontColor: selectedFontColor,
		backgroundColor: selectedBackgroundColor,
		contentWidth: selectedWidth,
		fontSizeOption: selectedFontSize
	}

	function handleClickReset() {
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedFontFamily(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedWidth(defaultArticleState.contentWidth);
	}

	const handleClickSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setNewSettings(userSettings)
	}

	function handleClose() {
		setIsMenuOpen(false)
	}

	const useOutsideClick = ({
		isMenuOpen,
		rootRef,
	}: UseOutsideClick) => {
		useEffect(() => {
			const handleClick = (event: MouseEvent) => {
				const { target } = event;
				if (target instanceof Node && !rootRef.current?.contains(target)) {
					handleClose();
				}
			};
	
			window.addEventListener('mousedown', handleClick);
	
			return () => {
				window.removeEventListener('mousedown', handleClick);
			};
		}, [isMenuOpen]);
	};

	useOutsideClick({
		isMenuOpen,
		rootRef: ref,
	})

	return (
		<>
			<ArrowButton OnClick={OnClick} isOpen={isMenuOpen} />
			<aside className={classToggleForm} ref={ref}>
				<form className={styles.form} onSubmit={handleClickSubmit}>
					<Text weight={800} size={31} uppercase >
						{"Задайте параметры"}
					</Text>
					<Select selected={selectedFontFamily} options={fontFamilyOptions} onChange={setSelectedFontFamily} title='Шрифт'/>
					<RadioGroup name={'fontSize'} options={fontSizeOptions} selected={selectedFontSize} title={'Размер шрифта'} onChange={setSelectedFontSize}/>
					<Select selected={selectedFontColor} options={fontColors} onChange={setSelectedFontColor} title='Цвет шрифта'/>
					<Separator />
					<Select selected={selectedBackgroundColor} options={backgroundColors} onChange={setSelectedBackgroundColor} title='Цвет фона'/>
					<Select selected={selectedWidth} options={contentWidthArr} onChange={setSelectedWidth} title='Ширина контента'/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleClickReset}/>
						<Button title='Применить' type='submit' onClick={handleClose}/>
					</div>
				</form>
			</aside>
		</>
	);
};
