import styled from '@emotion/styled';

/* Styled */
export const LoginContainer = styled.div`
	margin-top: 8px;

	& > div {
		display: flex;
		box-sizing: border-box;
		height: 50px;
		border: 1px solid #e5e5e5;
		border-radius: 4px;
		justify-content: space-between;
		align-items: center;
		margin: 0;
		padding: 0;
	}

	& > div:focus-within {
		border-color: #aaa !important;
		transition: border 0.2s ease-in-out;
	}

	& input {
		height: 48px;
		border: none;
		flex: 0 1 auto;
	}

	& input:focus-visible {
		outline: none;
	}

	& button {
		display: flex;
		margin-right: 7px;
		padding: 5px;
		flex: 0 0 auto;
	}
`;

export const LookButton = styled.button`
	min-width: 30px;
	height: 30px;
	margin-right: 7px;
	background: url('https://static.msscdn.net/ui/build/m/img/login/ic-30-show-button.svg?v=20220720164756')
		no-repeat 50% 50% !important;

	&.look {
		min-width: 30px;
		height: 30px;
		margin-right: 7px;
		background: url('https://static.msscdn.net/ui/build/m/img/login/ic-30-hide-button.svg?v=20220802142734')
			no-repeat 50% 50% !important;
	}
`;
