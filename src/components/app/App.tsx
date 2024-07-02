import { CSSProperties, useState } from "react";
import { defaultArticleState } from "src/constants/articleProps";
import { Article } from "../article";
import styles from './index.module.scss';
import { ArticleParamsForm } from "../article-params-form";

export const App = () => {

	const [newSettings, setNewSettings] = useState(defaultArticleState)

	return (
		<main
			className={styles.main}
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
		</main>
	);
};