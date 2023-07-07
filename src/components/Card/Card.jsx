import React, { useEffect, useState } from 'react'

import * as S from './styles'

import Ilustration from '../../assets/imgs/searchPhoto.jpeg'


const TargetCard = ({ targetData, fetchTargetData }) => {
    const [filteredTargets, setFilteredTargets] = useState(targetData);

    useEffect(() => {
        fetchTargetData();
    }, [fetchTargetData]);

    useEffect(() => {
        setFilteredTargets(targetData);
    }, [targetData]);

    const handleSearchChange = (event) => {
        const searchValue = event.target.value;
        const filteredTargets = targetData.filter((target) =>
          target.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredTargets(filteredTargets);
    };

    return (
        <>
            {filteredTargets.length === 0 && (
                <S.Card>
                <S.CardInfo>
                    <S.Title>Nenhum resultado encontrado</S.Title>
                </S.CardInfo>
                </S.Card>
            )}
            {filteredTargets.map((target, index) => (
                <S.Card key={index}>
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
            ))}
        </>
      );
}

export default TargetCard