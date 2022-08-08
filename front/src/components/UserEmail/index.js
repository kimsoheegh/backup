import React, { useCallback } from 'react';
import { LoginContainer } from './styles';

const UserEmail = ({ props }) => {
	const { email, onChangeEmail, setEmail } = props;

	// input clear button
	const onClickClear = useCallback(() => {
		setEmail('');
	}, [setEmail]);

	return (
		<LoginContainer>
			<div>
				<input className="email" value={email} onChange={onChangeEmail} placeholder="아이디" />
				{email.length > 0 && (
					<button type="button" onClick={() => onClickClear()}>
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>입력한 내용 삭제</title>
							<circle cx="10" cy="10" r="10" fill="#B3B3B3"></circle>
							<path
								d="M5.52786 5.52742L14.4722 14.4718M14.4722 5.52734L5.52783 14.4717"
								stroke="white"
							></path>
						</svg>
					</button>
				)}
			</div>
		</LoginContainer>
	);
};

export default UserEmail;
