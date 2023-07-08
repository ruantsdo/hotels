import React from 'react'

import * as S from './styles'

import Ilustration from '../../assets/imgs/searchPhoto.jpeg'


const TargetCard = ({ targetData, filteredTargets, fetchTargetData, searchValue, handleCardClick }) => {
    return (
        <>
            {searchValue === "" ? (
                targetData.map((target, index) => (
                    <S.Card key={index} onClick={() => handleCardClick(index)}>
                    <S.CardImage src={Ilustration} />
                    <S.CardInfo>
                        <S.Title>{target.name}</S.Title>
                        <S.SubTitle>{target.address}</S.SubTitle>
                    </S.CardInfo>
                    <S.CardInfo2>
                        <S.Title>Vantagens</S.Title>
                        <S.Title>Quantidade de quartos: {target.rooms}</S.Title>
                    </S.CardInfo2>
                    </S.Card>
                ))
            ) : filteredTargets.length === 0 ? (
                <S.Card>
                    <S.CardInfo>
                    <S.Title>Nenhum resultado encontrado</S.Title>
                    </S.CardInfo>
                </S.Card>
            ) : (
                filteredTargets.map((target, index) => (
                    <S.Card key={index} onClick={() => handleCardClick(index)} >
                    <S.CardImage src={Ilustration} />
                    <S.CardInfo>
                        <S.Title>{target.name}</S.Title>
                        <S.SubTitle>{target.address}</S.SubTitle>
                    </S.CardInfo>
                    <S.CardInfo2>
                        <S.Title>Vantagens</S.Title>
                        <S.Title>Quantidade de quartos: {target.rooms}</S.Title>
                    </S.CardInfo2>
                    </S.Card>
                ))
            )}
        </>
      );
}

export default TargetCard