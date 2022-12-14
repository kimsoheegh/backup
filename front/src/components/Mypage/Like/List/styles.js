import styled from '@emotion/styled';

export const LikeSection = styled.section `
	width: calc(100% - 210px);
    padding: 0;
    /* float: right; */
	header{
		border-bottom: 3px solid #000000;
		padding-bottom: 14px;
		line-height: 1.5;
		font-size: 14px;
		position: relative;
		h1{
			display: inline-block;
			font-size: 24px;
		}
		h2{
			padding: 10px 0 6px 0;
			font-size: 18px;
		}
	}
`;

export const ImgSpan = styled.span`
	display: table-cell;
    width: 80px;
    padding-top: 96px;
    vertical-align: middle;
	position: relative;
    overflow: hidden;
	img{
		width: 100%;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}
`;

export const LikeUl = styled.ul`
	vertical-align: top;
`;

export const LikeLi = styled.li`
	padding: 0 10px;
	margin-top: 22px;
	width: 25%;
	box-sizing: border-box;
	float: left;
	display: table;
	table-layout: fixed;
	min-height: 96px;
	line-height: 1.5;
	font-size: 14px;
	text-align: left;
	position: relative;
	ul{
		width: 100%;
		display: table-cell;
		padding-left: 10px;
		vertical-align: middle;
		li{
			font-size: 14px;
    		line-height: 22px;
		}
		.brand{
			font-weight: 300;
			display: block;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.name{
			max-height: 22px;
			font-weight: bold;
    		overflow: hidden;
		}
		.price{
			margin-top: 6px;
    		font-weight: normal;
		}
		.like{
			line-height: 16px;
    		padding-top: 5px;
			color: red;
		}
		
	}
`;
