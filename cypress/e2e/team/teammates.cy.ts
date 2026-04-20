const TEAMMATES_PATH = '/teammates';

const getTeammateCards = () => cy.get('[data-cy="teammate-card"]');
const getTeammateNames = () => cy.get('[data-cy="teammate-card-name"]');

describe('팀원 찾기 흐름', () => {
  beforeEach(() => {
    cy.visit(TEAMMATES_PATH);
  });

  it('기본 진입 시 프로젝트 경험 많은 순으로 팀원 목록을 보여준다', () => {
    cy.contains('h1', '팀원 찾기').should('be.visible');
    cy.get('[data-cy="teammate-total-count"]').should('contain', '24');

    getTeammateCards().should('have.length', 15);
    getTeammateNames().first().should('have.text', '김도윤');
    cy.get('[data-cy="teammate-card-experience"]').first().should('contain', '11회');
  });

  it('이름, 분야, 기술 스택 조건을 함께 적용해 팀원을 필터링한다', () => {
    cy.get('[data-cy="teammate-search-input"]').type('권');
    cy.get('[data-cy="teammate-role-filter"][data-role="프론트엔드"]').click();
    cy.get('[data-cy="teammate-skill-input"]').type('React Query');

    cy.get('[data-cy="teammate-total-count"]').should('contain', '1');
    getTeammateCards().should('have.length', 1).first().should('have.attr', 'href', '/profile/14');
    getTeammateNames().should('have.text', '권나은');
  });

  it('정렬을 이름순으로 변경하면 목록 순서가 한글 오름차순으로 바뀐다', () => {
    cy.get('[data-cy="teammate-sort-select"]').select('name-asc');

    cy.get('[data-cy="teammate-total-count"]').should('contain', '24');
    getTeammateCards().should('have.length', 15);
    getTeammateNames().first().should('have.text', '강예나');
    getTeammateNames().eq(1).should('have.text', '권나은');
    getTeammateNames().eq(2).should('have.text', '김도윤');
  });

  it('목록 하단에 도달하면 추가 팀원 카드를 순차적으로 불러온다', () => {
    getTeammateCards().should('have.length', 15);

    cy.get('[data-cy="teammate-load-more-trigger"]').scrollIntoView();
    getTeammateCards().should('have.length', 20);

    cy.get('[data-cy="teammate-load-more-trigger"]').scrollIntoView();
    getTeammateCards().should('have.length', 24);
    cy.get('[data-cy="teammate-load-more-trigger"]').should('not.exist');
  });

  it('조건에 맞는 팀원이 없으면 빈 상태를 보여준다', () => {
    cy.get('[data-cy="teammate-search-input"]').type('없는이름');

    cy.get('[data-cy="teammate-total-count"]').should('contain', '0');
    cy.get('[data-cy="teammate-list"]').find('[data-cy="teammate-card"]').should('have.length', 0);
    cy.get('[data-cy="teammate-empty-state"]')
      .should('be.visible')
      .and('contain', '조건에 맞는 팀원이 아직 없어요.');
  });
});
