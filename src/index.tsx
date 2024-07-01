import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useEffect, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm, userSettings } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { Button } from './components/button';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {

	const [newSettings, setNewSettings] = useState(defaultArticleState)

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': newSettings.fontFamilyOption.value,
					'--font-size': newSettings.fontSizeOption.value,
					'--font-color': newSettings.fontColor.value,
					'--container-width': newSettings.contentWidth.value,
					'--bg-color': newSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setNewSettings={setNewSettings}/>
			<Article/>
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
