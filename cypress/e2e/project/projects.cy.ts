const PROJECTS_PATH = '/projects';

const getProjectCards = () => cy.get('[data-cy="project-card"]');
const getProjectTitles = () => cy.get('[data-cy="project-card-title"]');

describe('프로젝트 찾기 흐름', () => {
  beforeEach(() => {
    cy.visit(PROJECTS_PATH);
  });

  it('기본 진입 시 최신순으로 프로젝트 목록을 보여준다', () => {
    cy.contains('h1', '프로젝트 찾기').should('be.visible');
    cy.get('[data-cy="project-total-count"]').should('contain', '12');

    getProjectCards().should('have.length', 8);
    getProjectTitles().first().should('have.text', '핏로그: 운동 루틴 기록 플랫폼');
  });

  it('검색, 카테고리, 모집 상태, 플랫폼, 분야 조건을 함께 적용해 프로젝트를 필터링한다', () => {
    cy.get('[data-cy="project-search-input"]').type('정연준');
    cy.get('[data-cy="project-category-select"]').select('AI/테크');
    cy.get('[data-cy="project-recruit-select"]').select('모집 중만 보기');
    cy.get('[data-cy="project-platform-filter"][data-value="iOS"]').click();
    cy.get('[data-cy="project-field-filter"][data-value="백엔드"]').click();

    cy.get('[data-cy="project-total-count"]').should('contain', '1');
    getProjectCards().should('have.length', 1).first().should('have.attr', 'href', '/projects/1');
    getProjectTitles().should('have.text', 'AI 기반 뉴스 요약 서비스 개발');
  });

  it('정렬을 마감임박순으로 변경하면 빠른 마감 프로젝트가 먼저 보인다', () => {
    cy.get('[data-cy="project-sort-select"]').select('deadline');

    cy.get('[data-cy="project-total-count"]').should('contain', '12');
    getProjectCards().should('have.length', 8);
    getProjectTitles().first().should('have.text', 'meeTeam: 사이드 프로젝트 모집 플랫폼');
    getProjectTitles().eq(1).should('have.text', '트립게더: 여행 동행 구하기');
  });

  it('목록 하단에 도달하면 추가 프로젝트 카드를 불러온다', () => {
    getProjectCards().should('have.length', 8);

    cy.get('[data-cy="project-load-more-trigger"]').scrollIntoView();
    getProjectCards().should('have.length', 12);
    cy.get('[data-cy="project-load-more-trigger"]').should('not.exist');
  });

  it('조건에 맞는 프로젝트가 없으면 빈 상태를 보여주고 필터를 초기화할 수 있다', () => {
    cy.get('[data-cy="project-search-input"]').type('없는프로젝트');
    cy.get('[data-cy="project-category-select"]').select('친환경');

    cy.get('[data-cy="project-total-count"]').should('contain', '0');
    cy.get('[data-cy="project-list"]').should('not.exist');
    cy.get('[data-cy="project-empty-state"]').should('be.visible');
    cy.get('[data-cy="project-reset-filters"]').click();

    cy.get('[data-cy="project-search-input"]').should('have.value', '');
    cy.get('[data-cy="project-category-select"]').should('have.value', '모든 카테고리');
    cy.get('[data-cy="project-recruit-select"]').should('have.value', '전체 상태');
    cy.get('[data-cy="project-total-count"]').should('contain', '12');
    getProjectCards().should('have.length', 8);
    getProjectTitles().first().should('have.text', '핏로그: 운동 루틴 기록 플랫폼');
  });
});
