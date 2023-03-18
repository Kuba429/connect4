#include <stdio.h>
#include <stdlib.h>

struct position {
  int x;
  int y;
};

int check_horizontal(int x, int y, int board[6][7]);
int check_vertical(int x, int y, int board[6][7]);
int check_diagonal1(int x, int y, int board[6][7]);
int check_diagonal2(int x, int y, int board[6][7]);
int minimax(int board[6][7], struct position last_cell, int turn, int player,
            int ai, int maximizing, int depth, int alpha, int beta);
int check_result_by_cell(int x, int y, int board[6][7]);
int toggle_maximizing(int bool);
int toggle_turn(int turn);
struct position insert_cell(int board[6][7], int x, int value);

int get_best_move(int8_t board_prop[6 * 7], int turn, int player, int ai) {
  // reshape the array to 2 dimensions
  int board[6][7] = {0};
  int i = 0;
  for (int y = 0; y < 6; y++) {
    for (int x = 0; x < 7; x++) {
      board[y][x] = board_prop[i++];
    }
  }
  int best_x = 0;
  int best_score = -10000;
  int choices[7] = {3, 2, 4, 1, 5, 0, 6};
  for (int i = 0; i < 7; i++) {
    int x = choices[i];
    struct position cell = insert_cell(board, x, turn);
    if (cell.x == -1 || cell.y == -1)
      continue;
    int current_score =
        minimax(board, cell, turn, player, ai, 0, 8, -10000, 10000);
    board[cell.y][cell.x] = 0;
    if (current_score > best_score) {
      best_score = current_score;
      best_x = x;
    }
  };
  return best_x;
}
int minimax(int board[6][7], struct position last_cell, int turn, int player,
            int ai, int maximizing, int depth, int alpha, int beta) {
  int res = check_result_by_cell(last_cell.x, last_cell.y, board);
  if (res != 0) {
    if (res == ai)
      return 1;
    if (res == player)
      return -1;
  }
  if (depth < 1)
    return 0;
  if (maximizing == 1) {
    int best_score = -10000;
    for (int i = 0; i < 7; i++) {
      struct position cell = insert_cell(board, i, ai);
      if (cell.x == -1 || cell.y == -1)
        continue;
      int new_score =
          minimax(board, cell, player, player, ai, 0, depth - 1, alpha, beta);
      if (new_score > best_score)
        best_score = new_score;
      if (new_score > alpha)
        alpha = new_score;
      board[cell.y][cell.x] = 0;
      if (beta <= alpha)
        break;
    }
    return best_score;
  } else {
    int best_score = 10000;
    for (int i = 0; i < 7; i++) {
      struct position cell = insert_cell(board, i, player);
      if (cell.x == -1 || cell.y == -1)
        continue;
      int new_score =
          minimax(board, cell, ai, player, ai, 1, depth - 1, alpha, beta);
      if (new_score < best_score)
        best_score = new_score;
      if (new_score < beta)
        beta = new_score;
      board[cell.y][cell.x] = 0;
      if (beta <= alpha)
        break;
    }
    return best_score;
  }
}
struct position insert_cell(int board[6][7], int x, int value) {
  for (int y = 5; y >= 0; y--) {
    if (board[y][x] == 0) {
      board[y][x] = value;
      struct position cell = {x, y};
      return cell;
    }
  }
  struct position cell = {-1, -1};
  return cell;
}
// true to false and vice versa
int toggle_maximizing(int bool) {
  if (bool == 0)
    return 1;
  return 0;
}
int toggle_turn(int turn) {
  if (turn == 1)
    return 2;
  return 1;
}
int check_result_by_cell(int x, int y, int board[6][7]) {
  int hor = check_horizontal(x, y, board);
  if (hor != 0)
    return hor;
  int ver = check_vertical(x, y, board);
  if (ver != 0)
    return ver;
  int diag1 = check_diagonal1(x, y, board);
  if (diag1 != 0)
    return diag1;
  int diag2 = check_diagonal2(x, y, board);
  if (diag1 != 0)
    return diag1;
  return 0;
}
int check_vertical(int x, int y, int board[6][7]) {
  int og = board[y][x];
  if (og == 0)
    return 0;
  // count how many cells around have the same value
  int count = 1;
  int lowest = y;
  int highest = y;

  while (highest + 1 < 6 && board[highest + 1][x] == og) {
    count++;
    highest++;
  }

  while (lowest - 1 >= 0 && board[lowest - 1][x] == og) {
    count++;
    lowest--;
  }
  if (count >= 4)
    return og;
  return 0;
}

int check_horizontal(int x, int y, int board[6][7]) {
  int og = board[y][x];
  if (og == 0)
    return 0;
  // count how many cells around have the same value
  int count = 1;
  int lowest = x;
  int highest = x;

  while (highest + 1 < 7 && board[y][highest + 1] == og) {
    count++;
    highest++;
  }

  while (lowest - 1 >= 0 && board[y][lowest - 1] == og) {
    count++;
    lowest--;
  }
  if (count >= 4)
    return og;
  return 0;
}

int check_diagonal1(int x, int y, int board[6][7]) {
  int og = board[y][x];
  if (og == 0)
    return 0;
  // count how many cells around have the same value
  int count = 1;
  struct position lowest = {x, y};
  struct position highest = {x, y};

  while (highest.y + 1 < 6 && highest.x < 7 &&
         board[highest.y + 1][highest.x + 1] == og) {
    count++;
    highest.x++;
    highest.y++;
  }

  while (lowest.y - 1 >= 0 && lowest.x - 1 >= 0 &&
         board[lowest.y - 1][lowest.x - 1] == og) {
    count++;
    lowest.x--;
    lowest.y--;
  }
  if (count >= 4)
    return og;
  return 0;
}

int check_diagonal2(int x, int y, int board[6][7]) {
  int og = board[y][x];
  if (og == 0)
    return 0;
  // count how many cells around have the same value
  int count = 1;
  struct position lowest = {x, y};
  struct position highest = {x, y};

  while (highest.y + 1 < 6 && highest.x - 1 >= 0 &&
         board[highest.y + 1][highest.x - 1] == og) {
    count++;
    highest.x--;
    highest.y++;
  }

  while (lowest.y - 1 >= 0 && lowest.x + 1 < 7 &&
         board[lowest.y - 1][lowest.x + 1] == og) {
    count++;
    lowest.x++;
    lowest.y--;
  }
  if (count >= 4)
    return og;
  return 0;
}
