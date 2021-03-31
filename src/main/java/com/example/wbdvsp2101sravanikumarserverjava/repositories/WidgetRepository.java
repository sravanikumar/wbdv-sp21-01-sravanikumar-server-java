package com.example.wbdvsp2101sravanikumarserverjava.repositories;

import com.example.wbdvsp2101sravanikumarserverjava.models.Widget;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WidgetRepository extends CrudRepository<Widget, Long> {

    @Query(value="SELECT * FROM widgets", nativeQuery = true)
//    @Query("SELECT widget FROM Widget widget")
    public List<Widget> findAllWidgets();

    @Query(value="SELECT * FROM widgets WHERE id=:wid", nativeQuery = true)
    public Widget findWidgetById(@Param("wid") Long widgetId);
}
