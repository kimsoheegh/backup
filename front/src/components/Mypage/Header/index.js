import React from 'react';
import { Link } from 'react-router-dom';
import {
	Header,
	MypageTitle,
	PRFL_IMAGE,
	NickName,
	Profile,
	Navi,
	NaviList,
	StyleLink,
} from 'pages/Mypage/styles';

function mypage_header() {
	return (
		<Header>
			<MypageTitle>My Page</MypageTitle>
			<Profile>
				<PRFL_IMAGE></PRFL_IMAGE>
				<NickName>HELLOi</NickName>
			</Profile>
		</Header>
	);
}

export default mypage_header;
