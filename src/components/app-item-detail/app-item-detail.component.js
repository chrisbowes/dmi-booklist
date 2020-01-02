import React from 'react';
import styled from 'styled-components';
import AppLoading from '../app-loading/app-loading.component';
import AppFormattedPrice from '../app-formatted-price/app-formatted-price.component';
import { Store } from '../../store/app.store';
import listItemDataService from '../../services/app-list-item-data/app-list-item-data.service';
import { FormButton } from '../app-forms-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SelectMessage = styled.div`
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	align-content: center;
	text-align: center;
	margin: 1.6rem;
	flex: 2;
	border: 1px solid #e1e1e1;
	min-height: 50vh;
`;

const DetailArticle = styled.article`
	margin: 1.6rem;
	flex: 2;
`;

const DetailTitleRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const DetailTitle = styled.h3`
	color: #333;
	font-weight: 300;
`;

const DetailAuthor = styled.h4`
	margin: 0;
`;

const DetailImage = styled.img`
	width: 100%;
	@media screen and (max-width: 600px){
		margin-top: 1rem;
	}
`;

const DetailCloseButtonLabel = styled.span`
	display: inline-block;
	padding-left: 0.5rem;
`;

const AppItemDetail = (props) => {
	const { state, dispatch } = React.useContext(Store);

	React.useEffect(() => {
		if (state.loading === 'listItemData') {
			const selectedItem = state.listData.filter((item) => item.id === state.listItemDetail.id)[0];
			if (selectedItem && selectedItem.localStore) {
				dispatch({
					type: 'FETCH_LIST_ITEM_DATA_SUCCESS',
					payload: selectedItem
				});
			} else {
				async function getListItemData() {
					const listItemData = await listItemDataService(state.listItemDetail.id, state.userLogin.auth);
					if (listItemData.success) {
						dispatch({
							type: 'FETCH_LIST_ITEM_DATA_SUCCESS',
							payload: listItemData.data
						});
					} else {
						dispatch({
							type: 'CLEAR_DETAILS'
						});
						dispatch({
							type: 'FETCH_ERROR',
							payload: listItemData.error
						});
					}

				}
				getListItemData();
			}
		}
	}, [state, dispatch]);

	const data = state.listItemDetail;
	const imageSrc = data.image ? data.image : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA8AAAAMcAQMAAACl5F6MAAAABlBMVEW8vsDn6OnyCdevAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEbUlEQVR4AezBMQEAAADCoPVP7WsIoAcAAAAAAAAAAAAAAAAAAAAAAIydO0iOk4eCAGyVXNEuukF0FB1NHE1H0RG0ZEHRf5A99WYMk1T+Kvolw+vVjBf+CkMLoRCFWQkuqCquB3QOOQKrCpwBKJ1i6Jxk/EzTubaArgAHQOeyjhu8aMEafUrYolLjLRMfLrpw5cMYadeBnTLcrwN7ZXi+DhyuCi8GG/xy8Gyw3SRe7n7cLzfnajah5z87keFJ//lYf0WAAq+vv+rDX+fir+zpr2Xqr95qrle/ywr9OxX+/nF19fGRmR/yrzCJCudRqNHiNDHhIlquTBgCF2aX3V2BwYT9nUYdNoNojnqjiKJ56q0xiRaok4EsWqQO2EW0RJ3wQbTMvDc6iFaYswEvkx5Hnf8E0Tx1xhcfj3gh1lhOLHVWnx8vLvBq/FAnYpGBhwEElVfjhyETjVjj5bFanATpLrHIcpDkIstpJRdZLmRykaW63CLLMZKLLGeVXGS5jvlFluZKq8k1lnGMXGMZuck1lnsVu8ZydybXWOYj5BrLDIxcY5lz8mrML/JupPIC02osf3tyjeVqY9dYikys8QlTAUIsFovFYrFYLJaIP8hq8D4GG2ywwQYbbLDBBhtssMEGG2ywwQYb3N9+G/ePwQYbbLDBBhtssMEGG5yhA3ugqcARmFXgDKwqcAGgAsu+J1zYy94UXDjIRxosH+crwUm2euHCWX43Fy7YciUYI9N1YIeRavDpsMdIM9jgs+BOh4PBavA3ras6aMFRC06TEpyrLsy/H5emBKOrwvxZpsOsA3ssOk8SQQ9edZ4WI6DzfJwU4Ym/FCE7ofFXfQoJlnUugRsHdl9GTKBzlxRF6vzVW9kngr5eLTB5hT6MUhPgLfdDRhwQCQ79TQXe756tAWcp10XgIuMYF8aWxoedLtz5sB/wzIeDLrzw4QiRqHBSgOvnwLWFCrc7eCLCbnwrXFh2ZMdHKhEOyx3ciHBch8OHE2TtCZ0IZ0wCz1S4jhGTDhc0ecN9IcLja/qEVwIswqwC+/H3zfgMDw7j95cbPBFg+YEKnIaGWyoNzpvmcEujws0rwGX7LnCnwWOgDLhlZsFuaJEP+zFCC7yw4DCAhFtWFhwHl/lwwpeowRMJzlpw+QpXEgwl2O3gxoH9Du4cOOzgmQNHLTjt4OXF4byDVw5csAsHhhLssM/EgD32qQw4aMER+zQtuDPgpAVn7DMz4IJ9FgYMJdgdwSsB9jgKAQ5acDyEJy24ng8nLTgfwu18uBzC/XwYSrA7hmfCeyCHWU6Hw18Gr4R3fY5zOpy04PwEngj/KfYw9WwYSrB7BjfCW4qH6a8Kh2fwTHgF9jDLyXDSgvMzeKW8UX6Uk2Eowe45PL0m7J/D9VQ4aMG/isH/JwYbbLDBBhtssMEGG2ywtz3K/2tvDmQAAAAABvlbn+NbCSQWi8VisVgsFovFYrFYLBYvAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEHVJjR5bJLd8AAAAASUVORK5CYII=';
	const clearDetails = () => dispatch({ type: 'CLEAR_DETAILS' });

	return (
		<>
			{!data.id ?
				<SelectMessage>No Details Selected</SelectMessage>
				:
				<DetailArticle>
					{state.loading === 'listItemData' ?
						<AppLoading cssHeight="100%" />
						:
						<>
							{props.mobileView && 
								<FormButton buttonClickAction={clearDetails} tone="light">
									<FontAwesomeIcon icon="window-close" style={{ color: '#999999' }} />
									<DetailCloseButtonLabel>Back to list</DetailCloseButtonLabel>
								</FormButton>
							}
							<DetailImage src={imageSrc} />
							<DetailTitleRow>
								<DetailTitle>{data.title}</DetailTitle>
								<AppFormattedPrice value={data.price} />
							</DetailTitleRow>
							<DetailAuthor>{data.author}</DetailAuthor>
						</>
					}
				</DetailArticle>
			}
		</>
	)
}

export default AppItemDetail;